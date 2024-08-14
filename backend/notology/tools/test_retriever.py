from dotenv import load_dotenv
from retriever import retriever_tool, RetrieverInput

# Load environment variables
load_dotenv()

def test_retriever():
    # Initialize the retriever tool
    namespace = "user_2iXDC1skhLKJiJvxZif0mRE2qQz_jn70gck5ygz2sdwsqt8dahwvh96y7vrv"
    query = "Summarize what will be covered in this class"
    
    input_data = RetrieverInput(namespace=namespace, query=query)

    results = retriever_tool.invoke(input_data.namespace, input_data.query)

    # Print the results
    print(f"Query: {query}")
    for result in results:
        print(f"Filename: {result['filename']}")
        print(f"Content: {result['content']}")
        print("---")

if __name__ == "__main__":
    test_retriever()