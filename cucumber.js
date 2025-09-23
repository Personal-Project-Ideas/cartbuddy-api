module.exports = {
  default: `
    --require-module ts-node/register
    --require-module tsconfig-paths/register
    --require test/bdd/**/*.ts
    --format progress
    --format @cucumber/pretty-formatter
    --format html:test/bdd/reports/report.html
    test/bdd/**/*.feature
  `
};
