const jwt = require("jsonwebtoken");
const encrypt = require("../../utils/encrypt");
const userService = require("../services/userService");

const login = async (data) => {
  try {
    const { email, password } = data;
    const user = await userService.findByEmail(email);
    if (!user) {
      return { status: 401, error: "Authentication failed" };
    }

    const passwordMatch = encrypt.encrypt(password) === user.password;
    if (!passwordMatch) {
      return { status: 401, error: "Authentication failed" };
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role.id },
      "your-secret-key",
      {
        expiresIn: "5h",
      }
    );
    return { status: 200, token: token };
  } catch (error) {
    return { status: 500, error: "Login failed" };
  }
};

module.exports = {
  login,
};
