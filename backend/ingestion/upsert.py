import os
from dotenv import load_dotenv
load_dotenv()
import json
from langchain_community.vectorstores import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain.schema import Document
import logging

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def upsert(namespace: str, output_dir: str, batch_size: int = 150):
    embeddings = OpenAIEmbeddings()
    index_name = os.getenv("PINECONE_INDEX_NAME")
    vectorstore = Pinecone.from_existing_index(index_name, embeddings)
    
    docs = []
    for filename in os.listdir(output_dir):
        if filename.endswith('.json'):
            try:
                with open(os.path.join(output_dir, filename), 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for item in data:
                        metadata = item.get('metadata', {})
                        metadata.update({
                            'type': item.get('type', ''),
                            'element_id': item.get('element_id', '')
                        })
                        doc = Document(
                            page_content=item.get('text', ''),
                            metadata=metadata
                        )
                        docs.append(doc)
            except Exception as e:
                logging.error(f"Error processing file {filename}: {str(e)}")
                continue
    
    total_docs = 0
    for i in range(0, len(docs), batch_size):
        batch = docs[i:i+batch_size]
        vectorstore.add_documents(batch, namespace=namespace)
        total_docs += len(batch)
    
    print(f"Upserted {total_docs} documents to Pinecone index '{index_name}' in namespace '{namespace}'")