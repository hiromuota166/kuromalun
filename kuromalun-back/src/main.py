from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import redis
import jwt

# FastAPIアプリケーションのインスタンス化
app = FastAPI()

# Redis接続
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# パスワードハッシュ化の設定
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# シークレットキー（トークンの署名に使用）
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# OAuth2PasswordBearerオブジェクトを作成し、トークン取得用のエンドポイントを設定
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# ユーザ情報のスキーマ
class User:
    def __init__(self, username: str, hashed_password: str):
        self.username = username
        self.hashed_password = hashed_password

# ユーザ情報のダミーデータ（本番ではデータベースから取得する）
fake_users_db = {
    "user1": User(username="user1", hashed_password=pwd_context.hash("password1")),
    "user2": User(username="user2", hashed_password=pwd_context.hash("password2")),
}

# 認証用の関数
def authenticate_user(username: str, password: str):
    user = fake_users_db.get(username)
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user

# トークン発行用のエンドポイント
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # トークンを発行する
    access_token = jwt.encode({"sub": form_data.username}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": access_token, "token_type": "bearer"}

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

# プロテクトされたエンドポイント
@app.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    # トークンを検証し、ユーザ名を取得する
    username = verify_token(token)
    # ここでユーザ名を使って何かしらの処理を行う
    return {"message": f"Hello, {username}. You are authorized"}