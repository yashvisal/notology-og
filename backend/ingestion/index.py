from unstructured.ingest.connector.fsspec.s3 import SimpleS3Config, S3AccessConfig
from unstructured.ingest.interfaces import (
    ChunkingConfig,
    EmbeddingConfig,
    PartitionConfig,
    ProcessorConfig,
    ReadConfig,
)
from unstructured.ingest.runner import S3Runner

import os
from dotenv import load_dotenv
load_dotenv()

def s3_index(s3_key: str, namespace: str):
    url = f"{os.getenv('AWS_S3_URL')}{s3_key}"
    output_dir = f"s3-ingest-output/{namespace}"
    
    runner = S3Runner(
        processor_config=ProcessorConfig(
            output_dir=output_dir,
            num_processes=4,
        ),
        read_config=ReadConfig(),
        partition_config=PartitionConfig(
            strategy="fast",
            api_key=os.getenv("UNSTRUCTURED_API_KEY"),
            partition_by_api=True,
            partition_endpoint=os.getenv("UNSTRUCTURED_API_URL"),
        ),
        chunking_config=ChunkingConfig(
            chunking_strategy="by_title",
            max_characters=500,
            overlap=50
        ),
        connector_config=SimpleS3Config(
            access_config=S3AccessConfig(
                key=os.getenv('AWS_S3_ACCESS_KEY_ID'),
                secret=os.getenv('AWS_S3_SECRET_ACCESS_KEY')
            ),
            remote_url=url,
        ),
    )
    runner.run()
    return output_dir