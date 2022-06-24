import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud_user",
  namedPlaceholders: true,
  decimalNumbers: true,
});
