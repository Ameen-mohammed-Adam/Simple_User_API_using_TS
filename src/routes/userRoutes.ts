import { Router } from "express";
import { CreateUser } from "../Controllers/user";
export const router = Router();

router.post("/", CreateUser);
