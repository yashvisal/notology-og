import os
from unstructured.ingest.connector.fsspec.s3 import SimpleS3Config, S3AccessConfig
from unstructured.ingest.interfaces import (
    ChunkingConfig,
    EmbeddingConfig,
    PartitionConfig,
    ProcessorConfig,
    ReadConfig,
)
from unstructured.ingest.runner import S3Runner

def s3_index(s3_key: str):
    url = f"{os.getenv("NEXT_PUBLIC_S3_URL")}{s3_key}"
    runner = S3Runner(
        processor_config=ProcessorConfig(
            verbose=True,
            output_dir="s3-ingest-output",
            num_processes=4,
        ),
        read_config=ReadConfig(),
        partition_config=PartitionConfig(
            strategy="hi_res",
            api_key=os.getenv("UNSTRUCTURED_API_KEY"),
            partition_by_api=True,
            partition_endpoint=os.getenv("UNSTRUCTURED_API_URL"),
        ),
        chunking_config=ChunkingConfig(
            chunking_strategy="by_title",
            max_characters=500,
            overlap=50
        ),
        embedding_config=EmbeddingConfig(
            provider="langchain-openai",
            api_key=os.getenv("OPENAI_API_KEY")
        ),
        connector_config=SimpleS3Config(
            access_config=S3AccessConfig(
                key=os.getenv("NEXT_PUBLIC_S3_ACCESS_KEY_ID"),
                secret=os.getenv("NEXT_PUBLIC_S3_SECRET_ACCESS_KEY")
            ),
            remote_url=url,
        ),
    )
    runner.run()

def pinecone_upsert(namespace: str):
    pass

def run_ingestion(s3_key: str, namespace: str):
    s3_index(s3_key)
    pinecone_upsert(namespace)