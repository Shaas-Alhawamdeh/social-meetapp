from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from twilio.rest import Client
import os
import random

router = APIRouter(prefix="/auth", tags=["auth"])

TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH")
TWILIO_FROM = os.getenv("TWILIO_FROM")

client = Client(TWILIO_SID, TWILIO_AUTH)

OTPS = {}  # in-memory store

class PhoneRequest(BaseModel):
    phone: str

class VerifyRequest(BaseModel):
    phone: str
    code: str

@router.post("/send-otp")
def send_otp(data: PhoneRequest):
    print("OTP route hit")
    print("Sending OTP to:", data.phone)

    code = str(random.randint(100000, 999999))
    OTPS[data.phone] = code
    print("Generated OTP:", code)

    try:
        message = client.messages.create(
            body=f"Your SocialMeet OTP is: {code}",
            from_=TWILIO_FROM,
            to=data.phone
        )
        print("Twilio Message SID:", message.sid)
    except Exception as e:
        print("Twilio ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "OTP sent!"}


@router.post("/verify-otp")
def verify_otp(data: VerifyRequest, db: Session = Depends(get_db)):
    if data.phone not in OTPS:
        raise HTTPException(status_code=400, detail="No OTP sent to this number")

    if OTPS[data.phone] != data.code:
        raise HTTPException(status_code=400, detail="Incorrect code")

    return {"message": "OTP verified!"}

print("TWILIO SID:", TWILIO_SID)
print("TWILIO AUTH:", TWILIO_AUTH)
print("TWILIO FROM:", TWILIO_FROM)
