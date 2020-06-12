import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import { Input, FormFeedback, FormGroup, Label } from "reactstrap";

export default function InputCustom({ label, name, required , ...rest }) {
  //registerField = funcao que disparada assim que o componente é montado em tela
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return (
    <FormGroup>
      <Label htmlFor="{name}">{label} {required && <span style={{ color: "red" }}>*</span>}</Label>
      <Input
        invalid={error ? true : false}
        innerRef={inputRef}
        id={name}
        name={name}
        defaultValue={defaultValue}
        {...rest}
      />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );

}
InputCustom.defaultProps = {
  required: false
}
