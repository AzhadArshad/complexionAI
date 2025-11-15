import db from "../config/db.js";

export const getUserByAuthId = async (authId) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = 1", [authId]);
  return rows[0];
};
