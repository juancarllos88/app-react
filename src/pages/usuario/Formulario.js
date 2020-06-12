import React, { useState, useEffect, useRef } from "react";
import InputCustom from "../../components/Form/InputCustom";
import ButtonSubmitReset from "../../components/Form/ButtonSubmitReset";
import InputSelectCustom from "../../components/Form/InputSelectCustom";
import AlertCustom from "../../components/Form/AlertCustom";

import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";

import { Form } from "@unform/web";
import * as Yup from "yup";

import grupoService from "./../../services/grupo";
import usuarioService from "./../../services/usuario";
import { Constante } from "./../../util/constante";
import util from "./../../util/util";

function Formulario({ match }) {
  const formRef = useRef(null);
  const [permissao, setPermissao] = useState([]);

  const [mensagem, setMensagem] = useState("");
  const [severity, setSeverity] = useState("success");
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  useEffect(() => {
    async function loadGroups() {
      const response = await grupoService.buscarGrupos();
      const retorno = response.data.data.content;
      setPermissao(
        retorno.map((item) => {
          return {
            id: item.id,
            valor: item.nome,
          };
        })
      );
      const { id } = match.params;
      if (id !== undefined) {
        loadUser(id);
      }
    }
    loadGroups();
  }, [match.params]);

  async function loadUser(id) {
    const response = await usuarioService.getUsuario(id);
    formRef.current.setData(response.data.data);
    formRef.current.setFieldValue("grupos", response.data.data.grupos[0].id);
  }

  function validacaoCampos() {
    return Yup.object().shape({
      grupos: Yup.string().required("A permissão é obrigatória"),
      nome: Yup.string().required("O Nome é obrigatório"),
      login: Yup.string().min(6,'Mínimo 6 caracteres').required("O Login é obrigatório"),
      email: Yup.string()
        .email("Digite um email válido")
        .required("O email é obrigaório"),
    });
  }

  function getRequest(dados) {
    return {
      nome: dados.nome,
      login: dados.login,
      email: dados.email,
      gruposId: [dados.grupos],
    };
  }

  async function handleSubmit(dados, { reset }) {
    //console.log(formRef.current);
    try {
      const schema = validacaoCampos();

      await schema.validate(dados, {
        abortEarly: false,
      });
      const { id } = match.params;
      if (id !== undefined) {
        console.log('atualizar');
        await usuarioService.atualizar(getRequest(dados),id);
        setMensagem(Constante.ATUALIZAR);
      } else {
        await usuarioService.salvar(getRequest(dados));
        setMensagem(Constante.SUCESSO);
        reset();
      }
      setSeverity("success");
      setVisible(true);
      formRef.current.setErrors({});
      
    } catch (error) {
      console.tron.log(error);
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((e) => {
          errorMessages[e.path] = e.message;
        });
        formRef.current.setErrors(errorMessages);
      } else {
        setSeverity("danger");
        setMensagem(util.tratarExcecao(error.response));
        setVisible(true);
      }
    }
  }

  const initialData = {
    // nome: "Suenia de Barros",
    // login: "suenia.barros",
    // email: "juancarllos.a@gmail.com",
    // grupos: [11]
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>
              <strong>Cadastro de Usuários</strong>
              <small> Form</small>
            </CardHeader>
            <Form
              onSubmit={handleSubmit}
              initialData={initialData}
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
                  label="Nome"
                  name="nome"
                  type="text"
                  placeholder="Nome Completo"
                />

                <InputCustom
                  required={true}
                  label="Login"
                  name="login"
                  type="text"
                  placeholder="Login"
                />

                <InputCustom
                  required={true}
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email"
                />

                <InputSelectCustom
                  required={true}
                  label="Permissão"
                  name="grupos"
                  type="select"
                  lista={permissao}
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

export default Formulario;
