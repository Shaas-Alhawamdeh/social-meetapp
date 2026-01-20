import os
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from twilio.rest import Client
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
VERIFY_SID = os.getenv("TWILIO_VERIFY_SERVICE_SID")

if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not VERIFY_SID:
    raise RuntimeError("❌ Twilio environment variables not loaded")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

router = APIRouter(prefix="/auth", tags=["auth"])


class PhoneRequest(BaseModel):
    phone: str


class VerifyRequest(BaseModel):
    phone: str
    code: str


@router.post("/send-otp")
def send_otp(data: PhoneRequest):
    verification = client.verify.v2.services(VERIFY_SID).verifications.create(
        to=data.phone,
        channel="sms",
    )
    return {"status": verification.status}


@router.post("/verify-otp")
def verify_otp(data: VerifyRequest):
    check = client.verify.v2.services(VERIFY_SID).verification_checks.create(
        to=data.phone,
        code=data.code,
    )

    if check.status != "approved":
        raise HTTPException(status_code=400, detail="Invalid code")

    return {"status": "verified"}
