import express, { json, Router } from "express";
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import { userRouter } from "./routers/user.router";
import { handleError } from "./utils/errors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

const router = Router();

router.use("/api", userRouter);

app.use("/api", router);

app.use(handleError);

app.listen(3001, "0.0.0.0", () => {
  console.log("Server run!");
});
