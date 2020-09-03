import React, { useState, useContext } from 'react';
import { 
    Form,
    FormInput,
    FormGroup,
    Container,
    Row,
    Col,
    Button,
    Alert
} from "shards-react";

import { UserContext } from '../../context/UserContext';

import UserRequests from '../../api/UserRequests';


const Login = ({history}) => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameInputInvalid, setUsernameInputInvalid] = useState(false);
    const [passwordInputInvalid, setPasswordInputInvalid] = useState(false);
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [mensajeForm, setMensajeForm] = useState('');

    const validarForm = () => { 
        setIsFormInvalid(false)
        setUsernameInputInvalid(false);
        setPasswordInputInvalid(false);
        if(!username) {
            setIsFormInvalid(true);
            setUsernameInputInvalid(true);
            setMensajeForm('Por favor indique un nombre de usuario.');
            return false;
        }

        if(!password) {
            setIsFormInvalid(true);
            setPasswordInputInvalid(true);
            setMensajeForm('Por favor indique una contraseña.');
            return false;
        }

        if(password.length < 6) {
            setIsFormInvalid(true);
            setPasswordInputInvalid(true);
            setMensajeForm('La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        return true;
    }

    const logUser = async () => {
        if(!validarForm()) return;

        const res = await UserRequests.login(username, password);
        if(res.data.token) {
            localStorage.setItem('auth_token', res.data.token);
            setUserInfo({...userInfo, isLogged: true});
            history.push('/');
        } else {
            setIsFormInvalid(true);
            setMensajeForm('Credenciales incorrectas.');
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
                            <FormInput invalid={usernameInputInvalid} id="#username" placeholder="Nombre de Usuario" value={username} onChange={e => setUsername(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#password">Contraseña</label>
                            <FormInput invalid={passwordInputInvalid} type="password" id="#password" placeholder="Contraseña"  value={password} onChange={e => setPassword(e.target.value)}/>
                        </FormGroup>
                    </Form>
                    <Button onClick={logUser}>Iniciar Sesión</Button>
                    {isFormInvalid ? 
                    <Alert theme="danger" className="mt-3" fade>
                        {mensajeForm}
                    </Alert>
                    :
                    <React.Fragment/>}
                </Col>
            </Row>
        </Container>
    )
}

export default Login;