from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
import sys
sys.path.append("~/src")
from .mymodules import  OAuth_module, supabase_module
from pydantic import BaseModel
# FastAPIアプリケーションのインスタンス化
app = FastAPI()

# OAuth2PasswordBearerオブジェクトを作成し、トークン取得用のエンドポイントを設定
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# トークン発行用のエンドポイント
@app.post("/make-token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = OAuth_module.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # トークンを発行する
    access_token = jwt.encode({"sub": form_data.username}, OAuth_module.SECRET_KEY, algorithm=OAuth_module.ALGORITHM)
    return {"access_token": access_token, "token_type": "bearer"}


# プロテクトされたエンドポイント
@app.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    # トークンを検証し、ユーザ名を取得する
    username = OAuth_module.verify_token(token)
    # ここでユーザ名を使って何かしらの処理を行う
    return {"message": f"Hello, {username}. You are authorized"}


#新規ユーザ登録
@app.post("/create-new-users")
async def create_user(user: supabase_module.UserCreate):
    supabase_module.save_user(user)
    send_confirmation_email(user.email)

def send_confirmation_email(email: str):
    # 実際のメール送信の実装をここに追加
    print(f"Confirmation email sent to {email}")


####################################################################3
#テスト用コード
#新規ユーザ登録
@app.post("/test/create-new-users")
async def create_user(user: supabase_module.TestUserCreate):
    supabase_module.test_save_user(user)
    send_confirmation_email(user.email)

def send_confirmation_email(email: str):
    # 実際のメール送信の実装をここに追加
    print(f"Confirmation email sent to {email}")

# トークン発行用のエンドポイント
@app.post("/test/make-token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = OAuth_module.test_authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # トークンを発行する
    access_token = jwt.encode({"sub": form_data.username}, OAuth_module.SECRET_KEY, algorithm=OAuth_module.ALGORITHM)
    return {"access_token": access_token, "token_type": "bearer"}


# プロテクトされたエンドポイント
@app.get("/test/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    # トークンを検証し、ユーザ名を取得する
    username = OAuth_module.verify_token(token)
    # ここでユーザ名を使って何かしらの処理を行う
    return {"message": f"Hello, {username}. You are authorized"}

#サークル登録
@app.post("/make-circle")
async def protected_route(new_circle: supabase_module.CircleCreate, token: str = Depends(oauth2_scheme)):
    # トークンを検証し、ユーザ名を取得する
    username = OAuth_module.verify_token(token)
    # mailからuid取得
    uid = supabase_module.test_get_uid_from_email(username)
    return {"message": f"Hello, {username}. You are authorized"}
    supabase_module.save_circle(new_circle, uid)
    return {"message": f"Hello, {username}. You are authorized"}

##################--PingPong--#####################
class PingRequest(BaseModel):
    message: str

@app.post("/test/ping-pong/")
async def ping_pong(request: PingRequest):
    if request.message == "Ping":
        return {"message": "Pong"}
    else:
        raise HTTPException(status_code=400, detail="Invalid request")