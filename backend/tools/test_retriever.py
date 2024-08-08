import os
from dotenv import load_dotenv
from retriever import retriever_tool

# Load environment variables
load_dotenv()

def test_retriever():
    # Initialize the retriever tool
    namespace = "user_2iXDC1skhLKJiJvxZif0mRE2qQz_jn70gck5ygz2sdwsqt8dahwvh96y7vrv"  # Use the namespace from your original file
    tool = retriever_tool(namespace)

    # Test the tool with a sample query
    query = "Summarize what will be covered in this class"
    result = tool.run(query)

    # Print the result
    print(f"Query: {query}")
    print(f"Result: {result}")

if __name__ == "__main__":
    test_retriever()