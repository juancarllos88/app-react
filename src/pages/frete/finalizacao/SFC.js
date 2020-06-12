import React, { useState, useEffect, useRef } from "react";
import InputCustom from "../../../components/Form/InputCustom";
import ButtonSubmitReset from "../../../components/Form/ButtonSubmitReset";
import AlertCustom from "../../../components/Form/AlertCustom";
import {useHistory} from 'react-router-dom';

import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";

import { Form } from "@unform/web";
import * as Yup from "yup";



// import { Container } from './styles';

export default function SFC() {

  const formRef = useRef(null);

  const [mensagem, setMensagem] = useState("");
  const [severity, setSeverity] = useState("success");
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  const history = useHistory();

  const handleSubmit = (dados, { reset }) => {
    try {
      const valores = {
        valor1: 'teste1',
        valor2: 'teste2'
      }
      history.push('/dashboard/frete/qfc',valores);

    } catch (error) {}
  };



  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>
              <strong>Solicitação de Finalização</strong>
              <small> </small>
            </CardHeader>
            <Form
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <CardBody>
                <AlertCustom
                  message={mensagem}
                  severity={severity}
                  visible={visible}
                  onDismiss={onDismiss}
                />

                <InputCustom
                  required={true}
                  label="Cartão"
                  name="cartao"
                  type="text"
                  placeholder="9999-9999-9999-9999"
                />

                <InputCustom
                  required={true}
                  label="Senha"
                  name="senha"
                  type="text"
                  placeholder="9999"
                />


              </CardBody>
              <CardFooter>
                <ButtonSubmitReset />
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

