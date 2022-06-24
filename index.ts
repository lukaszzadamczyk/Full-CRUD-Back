import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Server run!");
});
