import React from "react";

// import { Container } from './styles';

import { Button } from "reactstrap";

export default function ButtonSubmitReset() {
  return (
    <>
      <Button type="submit" size="md" color="primary">
        <i className="fa fa-dot-circle-o"></i> Submit
      </Button>
      <Button
        type="reset"
        size="md"
        color="danger"
        style={{ marginLeft: "10px" }}
      >
        <i className="fa fa-ban"></i> Reset
      </Button>
    </>
  );
}
