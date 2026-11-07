// Read validity flags, never the browser's localized validationMessage.
export function englishValidationMessage(control) {
  const v = control.validity;
  if (control.disabled || !v) return "";
  if (v.badInput)
    return control.type === "number"
      ? "Enter a valid number."
      : "Enter a valid value.";
  if (v.valueMissing || (control.required && !String(control.value).trim())) {
    return control.tagName === "SELECT"
      ? "Please choose an option."
      : "Please fill out this field.";
  }
  if (v.rangeUnderflow) return `Enter a value of ${control.min} or more.`;
  if (v.rangeOverflow) return `Enter a value of ${control.max} or less.`;
  if (v.stepMismatch) return `Use increments of ${control.step || "1"}.`;
  if (v.tooLong) return `Use ${control.maxLength} characters or fewer.`;
  if (v.tooShort) return `Use at least ${control.minLength} characters.`;
  if (v.patternMismatch) return "Enter a value in the requested format.";
  if (v.typeMismatch) return "Enter a valid value.";
  if (!v.valid) return "Check this value and try again.";
  return "";
}
