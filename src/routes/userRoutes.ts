/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: User id
 *              name:
 *                  type: string
 *                  description: User name
 *              email:
 *                  type: string
 *                  description: User email
 *              password:
 *                  type: string
 *                  description: User password
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * tags:
 *  - name: Users
 *    description: User management
 * /api/v1/user:
 *  post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: User created
 *          400:
 *              description: Validation error
 *  get:
 *      summary: Get user data
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: User data
 *          401:
 *              description: Unauthorized
 * /api/v1/user/login:
 *  post:
 *      summary: Login
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Login successful
 *          401:
 *              description: Invalid credentials
 */

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
