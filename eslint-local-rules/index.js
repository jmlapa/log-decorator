/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
  },
});

module.exports = require("./rules").default;