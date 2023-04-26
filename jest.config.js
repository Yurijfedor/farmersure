const config = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js", "@testing-library/react"],
  verbose: true,
};

module.exports = config;
