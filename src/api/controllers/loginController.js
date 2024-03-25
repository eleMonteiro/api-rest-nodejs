const loginService = require("../services/loginService");

const login = async (req, res) => {
  const resultado = await loginService.login(req.body);
  const { status, error, token } = resultado;

  if (token == undefined) res.status(status).json(error);
  return res.status(status).json(token);
};

module.exports = {
  login,
};
