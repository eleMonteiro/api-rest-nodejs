import { login as _login } from "@services/loginService";

const login = async (req, res) => {
  try {
    const result = await _login(req.body);
    const { status, error, token, user } = result;

    if (!token) {
      return res.status(status).json({ message: error });
    }
    
    return res.status(status).json({ user: { name: user.name }, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export default {
  login,
};
