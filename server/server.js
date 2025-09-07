import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`server running at ${process.env.PORT || 5000}`)
);
