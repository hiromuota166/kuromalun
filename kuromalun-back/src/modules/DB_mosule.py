from fastapi import FastAPI, HTTPException, Depends, Form
from pydantic import BaseModel, EmailStr, field_validator, SecretStr, Field
from uuid import uuid4
from passlib.context import CryptContext
import redis
import re
from modules import OAuth_module
import hashlib


redis_client = redis.Redis(host='localhost', port=6379, db=0)

# ユーザーモデル
class User(BaseModel):
    uid: str
    userId: str
    displayName: str
    email: EmailStr
    password: SecretStr

# ユーザーの入力データ用モデル
class UserCreate(BaseModel):
    userId: str = Field(..., description="ユーザーが任意で設定できる一意なID")
    displayName: str = Field(..., description="表示名")
    email: EmailStr = Field(..., description="メールアドレス")
    password: SecretStr = Field(..., description="パスワード")

   

def save_user(user_request):
    # ユーザーIDとメールアドレスの一意性を確認
    if redis_client.hexists(f"user:{user_request.userId}", "userId"):
        raise HTTPException(status_code=400, detail="User ID already exists")
    if redis_client.hexists(f"user:{user_request.email}", "email"):
        raise HTTPException(status_code=400, detail="Email already exists")
    
    hashed_password = hashlib.sha256(user_request.password.get_secret_value().encode('utf-8')).hexdigest()
    # 新規ユーザーのUIDを生成
    uuid = str(uuid4())

    # ユーザーオブジェクトを作成
    new_user = User(
        uid=uuid,
        userId=user_request.userId,
        displayName=user_request.displayName,
        email=user_request.email,
        password=hashed_password
    )

    # Redisに保存
    user_key = f"user:{new_user.uid}"

    #redis_client.hset(user_key, mapping={"uid": new_user.uid,"userId": new_user.userId,"displayName": new_user.displayName,"email": new_user.email,"password": new_user.password.get_secret_value()})
    redis_client.hset(user_key, "uid", new_user.uid)
    redis_client.hset(user_key, "userId", new_user.userId)
    redis_client.hset(user_key, "displayName", new_user.displayName)
    redis_client.hset(user_key, "email", new_user.email)
    redis_client.hset(user_key, "password", new_user.password.get_secret_value())

    user_key_email = f"user:{new_user.email}"
    redis_client.hset(user_key_email, "uid", new_user.uid)

    user_key_userId = f"user:{new_user.userId}"
    redis_client.hset(user_key_userId, "uid", new_user.uid)

    # インデックスを更新（userIdとemailの一意性を保証するため）
    redis_client.hset("user:userId", new_user.userId, new_user.uid)
    redis_client.hset("user:email", new_user.email, new_user.uid)

    return {"message": "User created successfully", "user": new_user}

def get_user_login(user_email):
    if redis_client.hexists(f"user:{user_email}", "email"):
        uid = redis_client.hget(f"user:{user_email}", "uid")
        user_key = f"user:{uid}"
        userId = redis_client.hget(user_key, "userId")
        displayName = redis_client.hget(user_key, "displayName")
        email = redis_client.hget(user_key, "email")
        password = redis_client.hget(user_key, "password")

        user = User(
            uid=uid,
            userId=userId,
            displayName=displayName,
            email=email,
            password=password
        )
        return user
    raise HTTPException(status_code=400, detail="No account")