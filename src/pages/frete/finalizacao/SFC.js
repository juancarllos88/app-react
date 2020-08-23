import React, { useState, useEffect, useRef } from "react";
import InputCustom from "../../../components/Form/InputCustom";
import ButtonSubmitReset from "../../../components/Form/ButtonSubmitReset";
import AlertCustom from "../../../components/Form/AlertCustom";
import {useHistory} from 'react-router-dom';

import { Card, CardBody, CardFooter, CardHeader, Col, Row, Input } from "reactstrap";

import { Form } from "@unform/web";
import * as Yup from "yup";
import MaskedInput from 'react-text-mask'

import InputMask from 'react-input-mask';


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


 
  const firstLetter = /(?!.*[DFIOQU])[A-VXY]/i;
  const letter = /(?!.*[DFIOQU])[A-Z]/i;
  const digit = /[0-9]/;
  const mask = [firstLetter, digit, letter, " ", digit, letter, digit];


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

               
          <Input
          type="text"
          mask="9999 9999 9999 9999"
          maskChar=" "
          tag={InputMask}
        />

        
                

                <InputCustom
                  required={true}
                  label="Cartão"
                  name="cartao"
                  type="text"
                  placeholder="9999-9999-9999-9999"
                  mask="9999 9999 9999 9999"
                  maskChar=" "
                  tag={InputMask}
                />

                <InputCustom
                  required={true}
                  label="Senha"
                  name="senha"
                  type="password"
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

