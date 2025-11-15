// services/user.service.js
import { db } from "../config/db.js";

export const getUserByAuthId = async (authId) => {
  const [rows] = await db.query("SELECT * FROM users where id=1", [authId]);
  return rows;
};
