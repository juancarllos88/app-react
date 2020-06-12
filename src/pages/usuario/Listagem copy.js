import React, { useEffect, useState, useRef } from "react";

import usuarioService from "./../../services/usuario";
import DataTable from "./../../components/Form/DataTable";
import factory from "./../factory/factoryDataTable";

import {
  Card,
  CardBody,
  FormGroup,
  CardHeader,
  Col,
  Row,
  Button,
} from "reactstrap";
import { Form } from "@unform/web";
import Input from "../../components/Form/InputSearch";
import LoadingOverlay from 'react-loading-overlay'
import MoonLoader from 'react-spinners/MoonLoader'

export default function Listagem() {
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    header: [],
    rows: [],
    page: 0,
    lastPage: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const formRef = useRef(null);

  function loadData(e) {
    const id = parseInt(e.target.value);
    if (id < 0) {
      loadUsers(0);
    } else {
      loadUsers(id);
    }
  }

  async function loadUsers(pagina) {
    const login = formRef.current.getFieldValue("login");
    setLoading(true);
    const response = await usuarioService.pesquisarComParametros(
      pagina,
      2,
      login
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
    treatResponse(response);
  }

  useEffect(() => {
    async function begin() {
      const response = await usuarioService.pesquisar(0, 2);
      treatResponse(response);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    begin();
  }, []);

  function handleSubmit(dados, { reset }) {
    loadUsers(0);
  }

  function treatResponse(response) {
    const {
      content,
      totalPages,
      last,
      number,
      totalElements,
    } = response.data.data;

    const usuarios = factory.getUsuarios(content);

    const paginacao = {
      header: usuarios.headers,
      rows: usuarios.body,
      page: number,
      lastPage: last,
      totalElements: totalElements,
      totalPages: totalPages,
    };
    setPagination(paginacao);
  }




  return (
    <LoadingOverlay active={loading} spinner={<MoonLoader color={"#FFFFFF"} />} text='Loading...'>
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <strong>Listagem de Usuários</strong>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup row>
                  <Input
                    label="Login"
                    name="login"
                    type="text"
                    placeholder="Login"
                  />

                  <Col xs="2">
                    <Button type="submit" size="md" color="primary">
                      <i className="fa fa-search"></i> Pesquisar
                    </Button>
                  </Col>
                </FormGroup>
              </Form>

              <DataTable pagination={pagination} loadData={loadData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
     </LoadingOverlay>
  );
}
