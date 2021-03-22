module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  rules: {
    "vue/max-attributes-per-line": [1, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/no-mutating-props": "off",
    "vue/html-self-closing": "off",
    "no-prototype-builtins": "off",
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
  }
};
