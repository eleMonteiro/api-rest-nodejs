import { login as _login } from "../services/loginService.js";

const THIRTY_DAYS_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000;
const FIVE_HOURS_IN_MILLISECONDS = 5 * 60 * 60 * 1000;

export const login = async (req, res) => {
  try {
    const { email, password, stayConnected } = req.body;
    const result = await _login({ email, password, stayConnected });
    const { status, error, token, user } = result;

    if (!token) {
      return res.status(status).json({ message: error });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: stayConnected
        ? THIRTY_DAYS_IN_MILLISECONDS
        : FIVE_HOURS_IN_MILLISECONDS,
    });

    return res.status(status).json({
      user: {
        name: user.name,
        cpf: user?.cpf,
        dateOfBirth: user?.dateOfBirth,
        email: user.email,
        role: user?.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out successfully!" });
};
