const { isEmail } = require("validator");
const validatorCPF = require("validar-cpf");
const { ADMIN, CLIENTE, AUTH } = require("./roles");

const validEmail = (email) => {
  return isEmail(email);
};

const validCPF = (cpf) => {
  return validatorCPF(cpf);
};

const validRole = (role) => {
  return (
    role &&
    ADMIN.toLowerCase(role) &&
    CLIENTE.toLowerCase(role) &&
    AUTH.toLowerCase(role)
  );
};

module.exports = {
  validEmail,
  validCPF,
  validRole,
};
