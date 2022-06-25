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
    const { id } = req.params;
    const removeUser = await UserRecord.remove(id);
    res.json(removeUser);
  })
  .get("/get/:id", async (req, res) => {
    const { id } = req.params;
    const user = await UserRecord.getOneUser(id);
    res.json(user);
  })
  .put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const user = new UserRecord({ name, email, contact, id });
    await user.update();
  });
