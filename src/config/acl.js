const config = {
  baseUrl: "/",
  filename: "nacl.json",
  roleSearchPath: "user.role",
  path: "./",
};

const responseObject = {
  status: "Access Denied",
  message: "You are not authorized to access this resource",
};

module.exports = {
  config,
  responseObject,
};
