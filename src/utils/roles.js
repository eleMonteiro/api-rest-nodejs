export const ADMIN = "ADMIN";
export const CLIENTE = "CLIENTE";
export const AUTH = "AUTH";

export const getRoles = () =>
  [ADMIN, CLIENTE, AUTH].map((role) => ({ id: role }));
