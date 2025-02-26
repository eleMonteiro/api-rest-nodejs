const { isEmail } = require("validator");
const validatorCPF = require("validar-cpf");
const { ADMIN, CLIENTE, AUTH } = require("./roles");

const validEmail = (email) => {
  return email && isEmail(email);
};

const validCPF = (cpf) => {
  return cpf && validatorCPF(cpf);
};

const validRole = (role) => {
  return (
    role &&
    [ADMIN, CLIENTE, AUTH].map((r) => r.toLowerCase()).includes(role.toLowerCase())
  );
};

module.exports = {
  validEmail,
  validCPF,
  validRole,
};
