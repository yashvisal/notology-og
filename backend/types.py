from typing import Annotated, List, Sequence, TypedDict, Union

from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage

from langgraph.graph.message import add_messages

from pydantic import BaseModel

class ChatInputType(BaseModel):
    input: List[Union[HumanMessage, AIMessage, SystemMessage]]

class AgentState(TypedDict):
    # The add_messages function defines how an update should be processed
    # Default is to replace. add_messages says "append"
    messages: Annotated[Sequence[BaseMessage], add_messages]