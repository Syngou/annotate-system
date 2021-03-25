module.exports = {
  processors: [],
  plugins: [],
  extends: "stylelint-config-standard", // 这是官方推荐的方式
  rules: {
    "at-rule-name-case": "lower" | "upper",
    "block-no-empty": true,
  },
};
