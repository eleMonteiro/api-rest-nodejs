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
    if (Array.isArray(error)) {
      response.error = error.map((e) =>
        typeof e === "string" ? e : e.message || String(e)
      );
      const stacks = error
        .map((e) => (e && typeof e.stack === "string" ? e.stack : null))
        .filter((s) => s);
      if (stacks.length > 0) {
        response.stack = stacks;
      }
    } else {
      response.error = error.message || String(error);
      if (error.stack) {
        response.stack = error.stack;
      }
    }
  } else if (Array.isArray(error)) {
    response.error = error.map((e) =>
      typeof e === "string" ? e : e.message || String(e)
    );
  } else {
    response.error =
      typeof error === "string" ? error : error?.message || error;
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
