// "off" 或 0 - 关闭规则
// "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
// "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": ['markdown', "jsx-a11y", "react"],
    "rules": {
      "no-undef": 0,
      "no-unused-vars": 0,
      "no-prototype-builtins": 0,
      "no-redeclare": 0,
      "for-direction": 0,
      "no-unreachable": 0,
      "no-sparse-arrays": 0,
      "no-fallthrough": 0,
      "no-func-assign": 0
    }
};
