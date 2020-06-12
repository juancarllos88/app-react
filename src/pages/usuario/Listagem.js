import React, { useEffect, useState, useRef } from "react";

import usuarioService from "./../../services/usuario";
//import DataTable from "./../../components/Form/DataTable";
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
import LoadingOverlay from "react-loading-overlay";
import MoonLoader from "react-spinners/MoonLoader";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function Listagem() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    async function begin() {
      const response = await usuarioService.pesquisar(0, 50);
      treatResponse(response);
    }
    begin();
  }, []);

  async function handleSubmit(dados, { reset }) {
    const login = formRef.current.getFieldValue("login");
    setLoading(true);
    const response = await usuarioService.pesquisarComParametros(0,1000,login);
    treatResponse(response);
  }

  function treatResponse(response) {
    const { content } = response.data.data;
    const rows = factory.getUsuarios(content);
    setRows(rows);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total" style={{ marginLeft: "10px" }}>
      <strong>{ from } - { to } de { size } Resultados </strong>
    </span>
  );


  const options = {

    paginationSize: 10,
    pageStartIndex: 0,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    },{
      text: '10', value: 10
    },{
      text: '25', value: 25
    }]
  };

  const headers = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "nome",
      text: "Nome",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "login",
      text: "Login",
    },
    {
      dataField: "status",
      text: "Status",
      align: "center",
    },
    {
      dataField: "acao",
      text: "Ações"
    },
  ];

  return (
    <LoadingOverlay
      active={loading}
      spinner={<MoonLoader color={"#FFFFFF"} />}
      text="Loading..."
    >
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

                <BootstrapTable keyField='id' data={rows} columns={headers} pagination={ paginationFactory(options) } />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </LoadingOverlay>
  );
}
