import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

// import { Container } from './styles';

export default function InputSelectCustom({ label, name, lista=[], required , ...rest }) {
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
      <Label htmlFor={name}>{label} {required && <span style={{ color: "red" }}>*</span>}</Label>
      <Input
        invalid={error ? true : false}
        name={name}
        id={name}
        defaultValue={defaultValue}
        innerRef={inputRef}
        {...rest}
      >
        <option value="">Selecione</option>
        {lista.map(item => (
          <option value={item.id} key={item.id}>
            {item.valor} 
          </option>
        ))}
      </Input>
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
}

InputSelectCustom.defaultProps = {
  required: false
}
