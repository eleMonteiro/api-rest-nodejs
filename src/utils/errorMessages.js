const errorMessages = {
  validation: {
    FIELD_NOT_SPECIFIED: "Field not specified",
    INVALID_FIELD: "Invalid field",
    OBJECT_UNDEFINED: "Object was not reported",
    PRICE_DEMAND_INCORRECT: "Order price is less than the total value of the items",
  },
  database: {
    OBJECT_NOT_FOUND: "The requested object could not be found in the database",
  },
  authentication: {
    INVALID_CREDENTIALS: "Invalid credentials provided",
    UNAUTHORIZED: "You do not have permission to access this resource",
  },
};

module.exports = errorMessages;
