from fastapi import APIRouter,HTTPException
from pydantic import BaseModel


router = APIRouter()

class UserCreate(BaseModel):
    name: str
    role: str

class UserUpdate(BaseModel):
    name: str
    role: str


users=[
        {"id": 1, "name": "Pushparaj", "role": "React Developer"},
        {"id": 2, "name": "John", "role": "Python Developer"},
        {"id": 3, "name": "Sara", "role": "UI Designer"},
    ]; 
@router.get("/users")
def get_users():
    return users

@router.post("/users")
def create_user(user:UserCreate):
    new_user={
         "id": len(users) + 1,
        "name": user.name,
        "role": user.role,
    }

    users.append(new_user)
    return users

@router.delete("/users/{user_id}")
def delete_user(user_id: int):
    for user in users:
        if user["id"] == user_id:
            users.remove(user)
            return {"message": "User deleted successfully"}

    raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}")
def update_user(user_id: int, updated_user: UserUpdate):
    for user in users:
        if user["id"] == user_id:
            user["name"] = updated_user.name
            user["role"] = updated_user.role
            return user

    raise HTTPException(status_code=404, detail="User not found")

