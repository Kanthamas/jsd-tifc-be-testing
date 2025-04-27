import { Router } from "express";

import * as userController from "../controllers/userController.js";
import { verifyToken } from "./../middlewares/verifyToken.js";

const router = Router();

// GET all users
router.get("/", userController.getAllUsers);

// CREATE user
router.post("/", userController.createUser);

// REGISTER new user
router.post("/auth/register", userController.register);

// LOGIN user
router.post("/auth/login",userController.login);

export default router;
