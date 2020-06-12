import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import { Input, Col, Label } from "reactstrap";

export default function InputCustom({ name, label, ...rest }) {
  //registerField = funcao que disparada assim que o componente é montado em tela
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Col xs="auto">
        <Label htmlFor={name}>
          <strong>{label}</strong>
        </Label>
      </Col>
      <Col xs="2">
        <Input
          innerRef={inputRef}
          id={name}
          name={name}
          defaultValue={defaultValue}
          {...rest}
        />
      </Col>
    </>
  );
}
