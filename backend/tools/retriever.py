import os
from dotenv import load_dotenv
from langchain.tools.retriever import create_retriever_tool
from langchain_community.vectorstores import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate

load_dotenv()

# TODO: pass namespace to this function
def create_retriever(namespace: str):
    index_name = os.getenv("PINECONE_INDEX_NAME")
    embeddings = OpenAIEmbeddings()

    vectorstore = Pinecone.from_existing_index(
        index_name=index_name,
        namespace=namespace,
        embedding=embeddings
    )

    return vectorstore.as_retriever(search_kwargs={"k": 5})

def retriever_tool(namespace: str):
    retriever = create_retriever(namespace)
    return create_retriever_tool(
        retriever,
        "retrieve_docs",
        "Searches and returns relevant documents from the user's subject-specific knowledge base.",
        document_separator="\n\n---\n\n"
    )