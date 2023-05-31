module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  rules: {
    "testing-library/await-async-query": "off",
    "testing-library/prefer-screen-queries": "off"
  }
};
