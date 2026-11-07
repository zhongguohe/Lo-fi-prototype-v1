import React, { createContext, useContext, useId, useState } from "react";
import { englishValidationMessage } from "./validation";
const FormErrors = createContext({});
export function Field({ label, children }) {
  const id = useId();
  const errors = useContext(FormErrors);
  const message = errors[id];
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {React.cloneElement(children, {
        id,
        "aria-invalid": message ? true : undefined,
        "aria-describedby": message ? `${id}-error` : undefined,
      })}
      {message && (
        <span className="field-error" id={`${id}-error`}>
          {message}
        </span>
      )}
    </div>
  );
}
export default function Form({ children, onSubmit, ...props }) {
  const [errors, setErrors] = useState({});
  function submit(event) {
    event.preventDefault();
    const controls = [...event.currentTarget.elements];
    const nextErrors = {};
    let firstInvalid;
    for (const control of controls) {
      const message = englishValidationMessage(control);
      if (message) {
        nextErrors[control.id] = message;
        firstInvalid ||= control;
      }
    }
    setErrors(nextErrors);
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    onSubmit?.(event);
  }
  return (
    <FormErrors.Provider value={errors}>
      <form
        {...props}
        noValidate
        onSubmit={submit}
        onInputCapture={(event) => {
          const id = event.target.id;
          if (errors[id])
            setErrors((previous) => {
              const next = { ...previous };
              delete next[id];
              return next;
            });
        }}
      >
        {Object.keys(errors).length > 0 && (
          <p className="form-error-summary" role="alert">
            Please check the highlighted fields.
          </p>
        )}
        {children}
      </form>
    </FormErrors.Provider>
  );
}
