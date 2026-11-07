import test from "node:test";
import assert from "node:assert/strict";
import { englishValidationMessage as message } from "../src/validation.js";
const control = (changes = {}) => ({
  tagName: "INPUT",
  type: "text",
  value: "",
  required: false,
  validity: { valid: true },
  ...changes,
});
test("required select errors use English regardless of browser locale", () => {
  assert.equal(
    message(
      control({
        tagName: "SELECT",
        required: true,
        validity: { valueMissing: true },
        validationMessage: "请选择一项",
      }),
    ),
    "Please choose an option.",
  );
});
test("required text and whitespace cannot bypass custom validation", () => {
  assert.equal(
    message(control({ required: true, value: "  " })),
    "Please fill out this field.",
  );
});
test("numeric range, format, and step messages are English", () => {
  assert.equal(
    message(control({ type: "number", validity: { badInput: true } })),
    "Enter a valid number.",
  );
  assert.equal(
    message(control({ min: "1", validity: { rangeUnderflow: true } })),
    "Enter a value of 1 or more.",
  );
  assert.equal(
    message(control({ max: "180", validity: { rangeOverflow: true } })),
    "Enter a value of 180 or less.",
  );
  assert.equal(
    message(control({ step: "0.1", validity: { stepMismatch: true } })),
    "Use increments of 0.1.",
  );
});
test("valid optional and disabled controls do not block saving", () => {
  assert.equal(message(control()), "");
  assert.equal(
    message(control({ disabled: true, validity: { valueMissing: true } })),
    "",
  );
});
