import React, { useState, useContext } from 'react';
import { 
    Form,
    FormInput,
    FormGroup,
    Container,
    Row,
    Col,
    Button
} from "shards-react";

import { UserContext } from '../../context/UserContext';

import UserRequests from '../../api/UserRequests';
import request from '../../api/axios.instance';


const Login = ({history}) => {
    const [isLogged, setIsLogged] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logUser = async () => {
        const res = await UserRequests.login(username, password);
        if(res.data.token) {
            localStorage.setItem('auth_token', res.data.token);
            request.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setIsLogged(true);
            history.push('/')
        } else {
            console.log('not login')
        }
    }

    return (
        <Container>
            <Row>
                <Col sm="6" lg="6">
                    <Form>
                        <h1>Iniciar Sesión</h1>
                        <FormGroup>
                            <label htmlFor="#username">Nombre de Usuario</label>
                            <FormInput id="#username" placeholder="Nombre de Usuario" value={username} onChange={e => setUsername(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#password">Contraseña</label>
                            <FormInput type="password" id="#password" placeholder="Contraseña"  value={password} onChange={e => setPassword(e.target.value)}/>
                        </FormGroup>
                    </Form>
                    <Button onClick={logUser}>Iniciar Sesión</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;