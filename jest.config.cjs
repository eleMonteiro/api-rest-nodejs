module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleNameMapper: {
    "^@controllers/(.*)$": "<rootDir>/src/api/controllers/$1",
    "^@services/(.*)$": "<rootDir>/src/api/services/$1",
    "^@repositories/(.*)$": "<rootDir>/src/api/repositories/$1",
    "^@models/(.*)$": "<rootDir>/src/api/models/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
  },
  transform: {
    "^.+\\.js$": "babel-jest"
  },
};
