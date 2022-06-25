import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./routers/user.router";
import { handleError } from "./utils/errors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRouter);

app.use(handleError);

app.listen(3001, "0.0.0.0", () => {
  console.log("Server run!");
});
