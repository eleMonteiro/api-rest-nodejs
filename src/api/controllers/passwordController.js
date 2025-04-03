import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ error: "Token and new password are required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [updatedRows] = await User.update(
      { password: hashedPassword },
      { where: { email: decoded.email } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ message: "Password reset successfully." });
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token." });
  }
};
