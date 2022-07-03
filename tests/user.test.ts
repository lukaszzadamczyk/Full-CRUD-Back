import { UserRecord } from "../records/user.record";
import { UserEntity } from "../types";
import { pool } from "../utils/db";

let user: UserRecord;

const defaultObject: UserEntity = {
  id: "abc",
  name: "Tester",
  email: "tester@tester.com",
  contact: "111111111",
};

beforeAll(async () => {
  user = new UserRecord({
    name: "Tester",
    email: "test@test.com",
    contact: "111111111",
  });
});

afterAll(async () => {
  await pool.end();
});

test("Not inserted UserRecord should have no ID", () => {
  expect(user.id).toBeUndefined();
});

test("UserRecord getAll returns array with users.", async () => {
  const users = await UserRecord.getAll();

  expect(users).not.toEqual([]);
  expect(users[0].id).toBeDefined();
  expect(users[0].name).toBeDefined();
  expect(users[0].email).toBeDefined();
  expect(users[0].contact).toBeDefined();
});

test("Inserted UserRecord should have an ID", async () => {
  await user.insert();

  expect(user.id).toMatch(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  );
  expect(user.id).toBeDefined();
});

test("UserRecord returns data for one user", async () => {
  const user = await UserRecord.getOneUser("Tester");

  expect(user).toBeDefined();
});

test("UserRecord remove after delete, should be no user in the database.", async () => {
  const testUser: UserEntity = defaultObject;

  const user = await UserRecord.remove(testUser.id);

  expect(user).toBeUndefined();
});
