from supabase import create_client, Client
from fastapi import  HTTPException
from pydantic import BaseModel, EmailStr,  SecretStr, Field, HttpUrl
from typing import List
from uuid import uuid4
import os
from dotenv import load_dotenv, find_dotenv
import hashlib

load_dotenv(find_dotenv())


url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# ユーザーモデル
class User(BaseModel):
    uid: str
    userId: str
    displayName: str
    email: EmailStr
    password: SecretStr

#サークルモデル
class Circle(BaseModel):
    uid: str
    ownerId: str
    name: str
    place: str
    time: str
    size: str
    link: List[HttpUrl]

# ユーザーの入力データ用モデル
class UserCreate(BaseModel):
    userId: str = Field(..., description="ユーザーが任意で設定できる一意なID")
    displayName: str = Field(..., description="表示名")
    email: EmailStr = Field(..., description="メールアドレス")
    password: SecretStr = Field(..., description="パスワード")

#サークル入力データ用モデル
class CircleCreate(BaseModel):
    name: str = Field(..., description="サークルの名前")
    place: str = Field(..., description="サークルの活動場所")
    time: str = Field(..., description="サークルの活動時間")
    size: str = Field(..., description="サークルの所属人数")
    link: List[HttpUrl] = Field(..., description="サークルのSNS等のURL")

def save_user(user_request):
    # ユーザーIDとメールアドレスの一意性を確認
    data, count = supabase.table("users").select('userId').eq("userId", user_request.userId).execute()
    if len(data[1]) != 0:
        raise HTTPException(status_code=400, detail="User ID already exists")
    data, count = supabase.table("users").select('email').eq("email", user_request.email).execute()
    if len(data[1]) != 0:
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

    # supabaseに保存

    data, count = supabase.table('users').insert({"userId": new_user.userId, "displayName": new_user.displayName, "email": new_user.email, "password":  new_user.password.get_secret_value()}).execute()

    return {"message": "User created successfully", "user": new_user}

def get_user_login(user_email):
    data, count = supabase.table("users").select('*').eq("email", user_email).execute()
    if len(data[1]) == 0:
        raise HTTPException(status_code=400, detail="No account")
    else:
        uid = data[1][0]['uid']
        userId = data[1][0]['userId']
        displayName = data[1][0]['displayName']
        email = data[1][0]['email']
        password = data[1][0]['password']
        user = User(
            uid=uid,
            userId=userId,
            displayName=displayName,
            email=email,
            password=password
        )
        return user
#メールアドレスからuidを取得する関数
def get_uid_from_email(mail):
    uid = supabase.table('users').select("uid").eq("email", mail).execute()
    return uid

#サークルデータを保存する関数
def save_circle(new_circle, user_uid):
    data, count = supabase.table('circles').insert({"ownerId": user_uid, "name": new_circle.name, "place": new_circle.place, "time":  new_circle.time, "size":  new_circle.size, "link": new_circle.link}).execute()
    return {"message": "Circle created successfully", "circle": new_circle.name}
##############################################################################
#テスト用コード 
class TestUserCreate(BaseModel):
    displayName: str = Field(..., description="表示名")
    email: EmailStr = Field(..., description="メールアドレス")
    password: SecretStr = Field(..., description="パスワード")

def test_save_user(user_request):
    # メールアドレスの一意性を確認
    data, count = supabase.table("test_users").select('email').eq("email", user_request.email).execute()
    if len(data[1]) != 0:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    hashed_password = hashlib.sha256(user_request.password.get_secret_value().encode('utf-8')).hexdigest()
    # 新規ユーザーのUIDを生成
    uuid = str(uuid4())
    userId = str(uuid4())

    # ユーザーオブジェクトを作成
    new_user = User(
        uid=uuid,
        userId=userId,
        displayName=user_request.displayName,
        email=user_request.email,
        password=hashed_password
    )

    # supabaseに保存

    data, count = supabase.table('test_users').insert({"userId": new_user.userId, "displayName": new_user.displayName, "email": new_user.email, "password":  new_user.password.get_secret_value()}).execute()
    data, count = supabase.table("test_users").select('*').eq("email", user_request.email).execute()
    new_user.uid = data[1][0]['uid']
    new_user.userId = data[1][0]['userId']

    return {"message": "User created successfully", "user": new_user}

def test_get_user_login(user_email):
    data, count = supabase.table("test_users").select('*').eq("email", user_email).execute()
    if len(data[1]) == 0:
        raise HTTPException(status_code=400, detail="No account")
    else:
        uid = data[1][0]['uid']
        userId = data[1][0]['userId']
        displayName = data[1][0]['displayName']
        email = data[1][0]['email']
        password = data[1][0]['password']
        user = User(
            uid=uid,
            userId=userId,
            displayName=displayName,
            email=email,
            password=password
        )
        return user
    
#メールアドレスからuidを取得する関数
def test_get_uid_from_email(mail):
    uid = supabase.table('test_users').select("uid").eq("email", mail).execute()
    return uid