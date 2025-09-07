import express from "express";
import { getUserPortfolioData } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/portfolio", getUserPortfolioData);

export default userRouter;
