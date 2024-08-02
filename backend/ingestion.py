import os
from unstructured.ingest.connector.fsspec.s3 import SimpleS3Config, S3AccessConfig
from unstructured.ingest.connector.pinecone import (
    PineconeAccessConfig,
    PineconeWriteConfig,
    SimplePineconeConfig,
)
from unstructured.ingest.interfaces import (
    ChunkingConfig,
    EmbeddingConfig,
    PartitionConfig,
    ProcessorConfig,
    ReadConfig,
)
from unstructured.ingest.runner import S3Runner
from unstructured.ingest.runner.writers.pinecone import PineconeWriter

def get_writer():
    return PineconeWriter(
        connector_config=SimplePineconeConfig(
            access_config=PineconeAccessConfig(api_key=os.getenv("PINECONE_API_KEY")),
            index_name=os.getenv("PINECONE_INDEX_NAME"),
            environment=os.getenv("PINECONE_ENVIRONMENT"),
        ),
        write_config=PineconeWriteConfig(batch_size=80),
    )

def run_ingestion(s3_key: str):
    url = f"{os.getenv("NEXT_PUBLIC_S3_URL")}{s3_key}"
    # writer = get_writer()
    runner = S3Runner(
        processor_config=ProcessorConfig(
            verbose=True,
            output_dir="s3-output-to-pinecone",
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
        # writer=writer,
        # writer_kwargs={},
    )
    return runner.run()

# if __name__ == "__main__":
#     # This block is for testing purposes only
#     test_s3_key = "test_file.pdf"
#     result = run_ingestion(test_s3_key)
#     print(result)