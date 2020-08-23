import React, {useState} from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import {Response} from './../../services/dto/response';
import {login, setToken} from './../../services/auth'
import {Constante} from './../../util/constante'



function Login({history}) {

  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  let erro = new Response();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await login(username, password);
      setToken(response.data.data);
      history.push("/dashboard");
    } catch (error) {
      erro = error.response;
      setVisible(true);
      if (erro === undefined) {
        setMensagem(Constante.ERRO_COMUNIC_API);
      } else if (Constante.BAD_REQUEST === erro.status) {
        setMensagem(erro.data.errors[0]);
      }
    }
  }


  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    { mensagem !== '' ? <Alert color="danger" isOpen={visible} toggle={onDismiss} >{mensagem}</Alert> : ''}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                    <Input
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                    />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button type="submit" color="primary" className="px-4">
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
