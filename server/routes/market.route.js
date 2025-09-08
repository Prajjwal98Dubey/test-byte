import express from "express";
import { getMarketUpdates } from "../controllers/market.controllers.js";
const marketRouter = express.Router();

marketRouter.get("/update", getMarketUpdates);

export default marketRouter;
