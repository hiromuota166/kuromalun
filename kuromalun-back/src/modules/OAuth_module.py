from fastapi import  HTTPException, status
from pydantic import  SecretStr
import jwt
from modules import supabase_module
import hashlib
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# シークレットキー（トークンの署名に使用）
SECRET_KEY = os.getenv("SECRET_KEY_TOKEN")
ALGORITHM = "HS256"
# パスワードハッシュ化の設定
#pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# トークンを検証する関数
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return username
    except jwt.JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
# 認証用の関数
def authenticate_user(username: str, password: str):
    password = SecretStr(password)
    user =  supabase_module.get_user_login(username)
    hashed_password = hashlib.sha256(password.get_secret_value().encode('utf-8')).hexdigest()
    if not user:
        return False
    if  hashed_password != user.password.get_secret_value():
        return False
    return user

########################################################################
#テスト用コード
    
# 認証用の関数
def test_authenticate_user(username: str, password: str):
    password = SecretStr(password)
    user =  supabase_module.test_get_user_login(username)
    hashed_password = hashlib.sha256(password.get_secret_value().encode('utf-8')).hexdigest()
    if not user:
        return False
    if  hashed_password != user.password.get_secret_value():
        return False
    return user

# 認証用の関数
def authenticate_user(username: str, password: str):
    password = SecretStr(password)
    user =  supabase_module.test_get_user_login(username)
    hashed_password = hashlib.sha256(password.get_secret_value().encode('utf-8')).hexdigest()
    if not user:
        return False
    if  hashed_password != user.password.get_secret_value():
        return False
    return user
