"use strict";

const expect = require("chai").expect;
const codecheck = require("codecheck");

describe("'3 idiots' CLI App", () => {
  const app = codecheck.consoleApp(process.env.APP_COMMAND);
  let validTestcases = require('./validcases.json');
  let invalidTestcases = require('./invalidcases.json');

  validTestcases.forEach(testcase => {
    it(`outputs '${testcase.output.join(" ")}' when input is '${testcase.input}'`, () => {
      return app.codecheck(testcase.input.split(" "))
        .then(result => {
          expect(result.code).to.equal(0, "CLI must exit with status code 0");
          expect(result.stdout).to.deep.equal(testcase.output);
        });
    });
  });

  invalidTestcases.forEach(testcase => {
    it(`outputs 'invalid' when inputs are invalid`, () => {
      return app.codecheck(testcase.input.split(" "))
        .then(result => {
          expect(result.code).to.equal(0, "CLI must exit with status code 0");
          expect(result.stdout).to.deep.equal(testcase.output);
        });
    });
  });
});
