import { v4 as uuid } from "uuid";
import { FieldPacket } from "mysql2";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { UserEntity } from "../types/user/user-entity";

type UserRecordResults = [UserEntity[], FieldPacket[]];
export class UserRecord implements UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public contact: string;

  constructor(obj: UserEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "The name cannot be empty and cannot have more than 100 characters."
      );
    }
    if (!obj.email || obj.email.length > 100) {
      throw new ValidationError(
        "The email cannot be empty and cannot have more than 100 characters."
      );
    }
    if (!obj.contact || obj.contact.length > 50) {
      throw new Error(
        "The contact cannot be empty and cannot have more than 50 characters."
      );
    }

    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.contact = obj.contact;
  }

  static async getAll(): Promise<UserEntity[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `user_contact`"
    )) as UserRecordResults;

    return results.map((result) => {
      const { id, name, email, contact } = result;

      return {
        id,
        name,
        email,
        contact,
      };
    });
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new ValidationError(
        "Cannot insert something that is already inserted."
      );
    }
    await pool.execute(
      "INSERT INTO `user_contact` (`id`, `name`, `email`, `contact`) VALUES (:id, :name, :email, :contact)",
      this
    );
  }
}
