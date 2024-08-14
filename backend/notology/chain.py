from typing import List, Optional, TypedDict

from langchain.output_parsers.openai_tools import JsonOutputToolsParser
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableConfig
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph
from langgraph.graph.graph import CompiledGraph

from notology.tools.retriever import retriever_tool

class AgentState(TypedDict, total=False):
    input: HumanMessage
    namespace: str
    result: Optional[str]
    """Plain text response if no tool was used."""
    tool_calls: Optional[List[dict]]
    """A list of parsed tool calls."""
    tool_results: Optional[dict]
    """The result of a tool call."""

def invoke_model(state: AgentState, config: RunnableConfig) -> AgentState:
    tools_parser = JsonOutputToolsParser()
    initial_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a helpful assistant. You're provided a list of tools, and an input from the user.\n"
                + "Your job is to determine whether or not you have a tool which can handle the users input, or respond with plain text.",
            ),
            MessagesPlaceholder("input")
        ]
    )
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0, streaming=True)
    tools = [retriever_tool]
    model_with_tools = model.bind_tools(tools)
    chain = initial_prompt | model_with_tools
    result = chain.invoke({"input": state["input"]}, config)

    if not isinstance(result, AIMessage):
        raise ValueError("Invalid result from model. Expected AIMessage.")

    if isinstance(result.tool_calls, list) and len(result.tool_calls) > 0:
        parsed_tools = tools_parser.invoke(result, config)
        return {"tool_calls": parsed_tools}
    else:
        return {"result": str(result.content)}

def invoke_tools_or_return(state: AgentState) -> str:
    if "result" in state and isinstance(state["result"], str):
        return END
    elif "tool_calls" in state and isinstance(state["tool_calls"], list):
        return "invoke_tools"
    else:
        raise ValueError("Invalid state. No result or tool calls found.") 

def invoke_tools(state: AgentState) -> AgentState:
    tools_map = {
        "retriever-tool": retriever_tool,
    }
    if state["tool_calls"] is not None:
        tool = state["tool_calls"][0]
        selected_tool = tools_map[tool["type"]]
        return {"tool_result": selected_tool.invoke(tool["args"])}
    else:
        raise ValueError("No tool calls found in state.")

def create_graph() -> CompiledGraph:
    workflow = StateGraph(AgentState)

    workflow.add_node("invoke_model", invoke_model)  # type: ignore
    workflow.add_node("invoke_tools", invoke_tools)
    workflow.add_conditional_edges("invoke_model", invoke_tools_or_return)
    workflow.set_entry_point("invoke_model")
    workflow.set_finish_point("invoke_tools")

    graph = workflow.compile()
    return graph