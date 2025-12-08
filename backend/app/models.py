from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, unique=True, index=True, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    username = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=True)

    # Add onboarding fields for your Tinder-style signup later:
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    birthday = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    interests = Column(String, nullable=True)  # store comma-separated or JSON

    # App status
    is_new = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
