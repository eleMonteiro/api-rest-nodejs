export const config = {
  baseUrl: "/api/v1/",
  filename: "nacl.json",
  roleSearchPath: "user.role",
  decodedObjectName: "user",
  path: "./",
  denyCallback: (res) => {
    return res.status(403).json({
      status: "Access Denied",
      message: "You are not authorized to access this resource",
    });
  },
};

export const responseObject = {
  status: "Access Denied",
  message: "You are not authorized to access this resource",
  code: 403,
};
