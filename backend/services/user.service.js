import db from "../config/db.js";

export const getUserByAuthId = async (authId) => {
  const [rows] = await db.query("SELECT * FROM users WHERE auth_user_id = ?", [
    authId,
  ]);
  return rows[0];
};
