# backend/routers/photos.py
from fastapi import APIRouter, UploadFile, File, Depends
import cloudinary.uploader
from database import get_db
from sqlalchemy.orm import Session
from models import UserPhoto

router = APIRouter(prefix="/photos", tags=["Photos"])

@router.post("/upload")
async def upload_photo(
    file: UploadFile = File(...),
    position: int = 0,
    user_id: int = 1,  # replace with auth later
    db: Session = Depends(get_db),
):
    result = cloudinary.uploader.upload(file.file)

    photo = UserPhoto(
        user_id=user_id,
        url=result["secure_url"],
        position=position,
    )
    db.add(photo)
    db.commit()

    return {
        "url": result["secure_url"],
        "position": position,
    }
