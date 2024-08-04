from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from ingestion.ingest import run_ingestion
import logging
import traceback

app = FastAPI()
logging.basicConfig(level=logging.DEBUG)

class IngestRequest(BaseModel):
    s3_key: str
    namespace: str

@app.post("/ingest")
async def ingest(request: IngestRequest):
    try:
        run_ingestion(request.s3_key, request.namespace)
        return {"message": "Ingestion successful"}
    except Exception as e:
        error_msg = f"Ingest error: {request.s3_key}\n{traceback.format_exc()}"
        logging.error(error_msg)
        raise HTTPException(status_code=500, detail=error_msg)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)