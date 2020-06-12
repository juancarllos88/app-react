import React from "react";

import { Alert } from "reactstrap";

// import { Container } from './styles';

export default function AlertCustom({ message, severity, visible, onDismiss }) {
  return (
    <>
      {message !== "" ? (
        <Alert color={severity} isOpen={visible} toggle={onDismiss}>
          {message}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}
