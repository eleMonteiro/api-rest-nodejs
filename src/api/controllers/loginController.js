const loginService = require("../services/loginService");

const login = async (req, res) => {
  const resultado = await loginService.login(req.body);
  const { status, error, token, user } = resultado;

  if (token == undefined) return res.status(status).json(error);
  return res.status(status).json({ user: { name: user.name }, token: token });
};

module.exports = {
  login,
};
