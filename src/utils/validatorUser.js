import validator from "validator";
import validarCpf from "validar-cpf";
import { ADMIN, CLIENTE, AUTH } from "../utils/roles.js";

export const validEmail = (email) => {
  return email && validator.isEmail(email);
};

export const validCPF = (cpf) => {
  return cpf && validarCpf(cpf);
};

export const validRole = (role) => {
  return (
    role &&
    [ADMIN, CLIENTE, AUTH]
      .map((r) => r.toLowerCase())
      .includes(role.toLowerCase())
  );
};
