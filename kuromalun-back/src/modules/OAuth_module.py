from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import redis
import jwt
from modules import DB_mosule
import hashlib

# シークレットキー（トークンの署名に使用）
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
# パスワードハッシュ化の設定
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
    user =  DB_mosule.get_user_login(username)
    if not user:
        return False
    if not pwd_context.verify(password, user.password):
        return False
    return user