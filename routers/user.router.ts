import { Router } from "express";
import { UserRecord } from "../records/user.record";

export const userRouter = Router()
  .get("/get", async (req, res) => {
    const users = await UserRecord.getAll();

    res.json(users);
  })
  .post("/add", async (req, res) => {
    const user = new UserRecord(req.body);
    await user.insert();
    res.json(user);
  })
  .delete("/delete/:id", async (req, res) => {
    const removeUser = await UserRecord.remove(req.params.id);
    res.json(removeUser);
  });
