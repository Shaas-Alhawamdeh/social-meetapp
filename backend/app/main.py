from fastapi import FastAPI
from .database import Base, engine
from .routers import auth
from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Social App Backend")
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)

@app.get("/")
def home():
    return {"status": "Welcome to the Social App Backend!"}

@app.get("/ping")
def ping():
    return {"message": "pong"}
