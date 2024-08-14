import os
from typing import List, Dict
from dotenv import load_dotenv
from langchain.pydantic_v1 import BaseModel, Field
from langchain_core.tools import tool
from langchain_community.vectorstores import Pinecone
from langchain_openai import OpenAIEmbeddings

load_dotenv()

class RetrieverInput(BaseModel):
    namespace: str = Field(..., description="The namespace for the Pinecone index.")
    query: str = Field(..., description="The query to search for in the user's subject-specific knowledge base.")

def create_retriever(namespace: str):
    index_name = os.getenv("PINECONE_INDEX_NAME")
    embeddings = OpenAIEmbeddings()

    vectorstore = Pinecone.from_existing_index(
        index_name=index_name,
        namespace=namespace,
        embedding=embeddings
    )

    return vectorstore.as_retriever(search_kwargs={"k": 5})

@tool("retriever-tool", args_schema=RetrieverInput, return_direct=True)
def retriever_tool(namespace: str, query: str) -> List[Dict]:
    """Searches and returns relevant documents from the user's subject-specific knowledge base."""
    retriever = create_retriever(namespace)
    docs = retriever.get_relevant_documents(query)
    
    results = []
    for doc in docs:
        results.append({
            "content": doc.page_content,
            "filename": doc.metadata.get("filename", "Unknown")
        })
    
    return results