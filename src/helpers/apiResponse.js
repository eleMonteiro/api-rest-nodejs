export const createdResponse = (res, data = null, message = "Created") => {
  res.status(201).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

export const successResponse = (
  res,
  data = null,
  status = 200,
  message = "Success"
) => {
  res.status(status).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

export const errorResponse = (
  res,
  message = "An error occurred",
  error = null,
  status = 500
) => {
  const response = {
    success: false,
    message,
    status,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development" && error) {
    response.error = error.message;
    response.stack = error.stack;
  }

  res.status(status).json(response);
};

export const notFoundResponse = (res, resource = "Resource") => {
  return errorResponse(res, `${resource} not found`, null, 404);
};

export const validationErrorResponse = (res, errors) => {
  return errorResponse(res, "Validation failed", errors, 422);
};

export const noContentResponse = (res) => {
  errorResponse(res, "No content", null, 204);
};

export const existsEntityResponse = (res, message) => {
  return errorResponse(res, message, null, 409);
};
