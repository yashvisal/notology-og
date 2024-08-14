import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langserve import add_routes

from notology.chain import create_graph
from notology.types import ChatInputType

load_dotenv()

def start() -> None:
    app = FastAPI(
        title="Notology",
        description="Helping students study smarter, not harder.",
    )

    # Configure CORS
    origins = [
        "http://localhost",
        "http://localhost:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    graph = create_graph()

    runnable = graph.with_types(input_type=ChatInputType, output_type=dict)

    add_routes(app, runnable, path="/chat", playground_type="default")
    print("Starting server...")
    uvicorn.run(app, host="localhost", port=8000)