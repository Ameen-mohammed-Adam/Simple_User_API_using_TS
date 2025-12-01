import { Router } from "express";
import { CreateUser, getUserData } from "../Controllers/user";
import { validate } from "../middleware/signUpValidate";
import { UserCreationValidation } from "../utils/UserValidation";
import { login } from "../Controllers/auth";
import { protect } from "../middleware/protect";
export const router = Router();

router.post("/", validate(UserCreationValidation), CreateUser);
router.post("/login", login);
router.get("/", protect, getUserData);
