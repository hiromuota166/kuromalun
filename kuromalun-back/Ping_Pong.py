from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

class PingRequest(BaseModel):
    message: str

app = FastAPI()

@app.post("/Ping-Pong/")
async def ping_pong(request: PingRequest):
    if request.message == "Ping":
        return {"message": "Pong"}
    else:
        raise HTTPException(status_code=400, detail="Invalid request")