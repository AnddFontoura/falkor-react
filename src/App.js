import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleLogin() {
    let formData = {
      'email': email,
      'password': password,
    };

    axios.post('http://localhost:8000/api/auth/login', formData).then(function (response) {
      setErrorMessage("");

    }).catch(function (error) {
      if (error.response.status == 401) {
        setErrorMessage('Email e/ou Senha Inválido');
      }
    });
  };
  
  function ShowError(props) {
    const hasError = props.errorMessage;

    if (hasError !== "" ) {
      return (
        <Alert variant='danger'> {hasError} </Alert>
      );
    }
  };

  return (
    <div className="App">
      <Container>
        <Card className='mt-3'>
          <Card.Header> Falkor -  Sistema Brasileiro de Futebol Amador </Card.Header>
          <Card.Body>
            <Form>
              <ShowError errorMessage={errorMessage} />
              <Form.Group className='mt-3' controlId='loginEmail'>
                <Form.Label> Email </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email para login'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mt-3' controlId='loginPassword'>
                <Form.Label> Senha </Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button
              variant='success'
              onClick={handleLogin}
            >
              Logar
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default App;
