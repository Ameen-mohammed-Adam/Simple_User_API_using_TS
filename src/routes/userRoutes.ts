import { Router } from "express";
import { CreateUser, getUserData } from "../Controllers/user";
import { validate } from "../middleware/signUpValidate";
import { UserCreationValidation } from "../utils/UserValidation";
export const router = Router();

router.post("/", validate(UserCreationValidation), CreateUser);
router.get("/", getUserData);
