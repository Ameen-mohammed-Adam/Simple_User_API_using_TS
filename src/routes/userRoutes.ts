import { Router } from "express";
import { CreateUser, getUserData } from "../Controllers/user";
export const router = Router();

router.post("/", CreateUser);
router.get("/", getUserData);
