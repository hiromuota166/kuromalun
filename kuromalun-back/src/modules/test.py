from supabase import create_client, Client
from fastapi import FastAPI, HTTPException, Depends, Form
from pydantic import BaseModel, EmailStr, field_validator, SecretStr, Field
from uuid import uuid4
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)
#data, count = supabase.table('users').insert({"userId": "testUser1", "displayName": "testUser1", "email": "testUser1@example.com", "password": "testUser1Pass"}).execute()
#data, count = supabase.table('users').delete().eq('uid', '7b4edac2-408e-4232-9405-cc135819ff42').execute()
data, response = supabase.table("users").select("*").eq("email", 'testUser1@example.com').execute()
print(data)
print(data[1][0]['uid'])
print(len(data[1]))
print(type(response))