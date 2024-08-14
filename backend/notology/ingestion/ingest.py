from upsert import upsert
from index import s3_index

def run_ingestion(s3_key: str, namespace: str):
    output_dir = s3_index(s3_key, namespace)
    upsert(namespace, output_dir)