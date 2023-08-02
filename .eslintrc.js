module.exports = {
  root: true,
  extends: "@react-native",
  rules: {
    //... other rules
    // use 'off' instead of "warn" to disable the rule and the error message
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto"
      }
    ]
  }
};
