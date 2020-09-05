import React, { useState, useContext } from "react";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  FormInput,
  Alert,
  Form
} from "shards-react";
import { useForm } from 'react-hook-form';
import Spinner from '../utils/Spinner';
import UserRequests from "../../api/UserRequests";
import { UserContext } from "../../context/UserContext";

const BajaUsuario = ({history}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, errors} = useForm();
  const [userInfo, setUserInfo] = useContext(UserContext);

  const toggle = () => setModalOpen(!modalOpen);

  const onSubmit = async data => {
    setIsloading(true);
    setError(false);

    try {
      const res = await UserRequests.login(data.nombre_usuario, data.contrasena);
      if(res.data.error) {
        console.log('invalido')
        setErrorMessage('Credenciales inválidas');
        setError(true);
        setIsloading(false)
      } else {
        await UserRequests.eliminarUsuario();
        setUserInfo({...userInfo, isLogged: false})
        history.push('/login')
      }
    } catch (error) {
      setErrorMessage('Ha ocurrido un error. Por favor inténtalo de nuevo.');
      setError(true);
    }
  }

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h4 className="m-0 ml-3">Darme de Baja</h4>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="text-center">
          <p>Si lo deseas, puedes darte de baja del sistema. Ten en cuenta que esto eliminará todos tus datos para siempre. Si deseas volver a ingresar, deberás comunicarte con un administrador.</p>
          <Button theme='danger' float='center' onClick={toggle}>Darme de Baja</Button>
          <Modal open={modalOpen} toggle={toggle}>
            <ModalHeader>Confirma que quieres darte de baja.</ModalHeader>
            <ModalBody>
              {isLoading ?  <Spinner /> : <React.Fragment/>}
              <p>Para finalmente darte de baja en el sistema, debemos asegurarnos de que eres tú. Por favor indica tu nombre de usuario y contraseña para continuar con el proceso.</p> 
              <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Col md="12" className="form-group">
                    <label htmlFor="nombre-usuario">Nombre de Usuario</label>
                    <FormInput
                        id="nombre-usuario"
                        placeholder="Nombre de Usuario"
                        type="text"
                        name="nombre_usuario"
                        innerRef={register({required: 'Indique su nombre de usuario' })}
                        invalid={errors.nombre_usuario}
                    />
                    {errors.nombre_usuario && <div class="invalid-feedback">{errors.nombre_usuario.message}</div>}
                  </Col>
                  {/* Segunda contrasena */}
                  <Col md="12" className="form-group">
                      <label htmlFor="contrasena">Contraseña</label>
                      <FormInput
                          id="contrasena"
                          placeholder="Contraseña"
                          type="password"
                          name="contrasena"
                          innerRef={register({required: 'Indique su contraseña', minLength: {value: 6, message:'La contraseña debe contener al menos 6 caracteres'}})}
                          invalid={errors.contrasena}
                      />
                      {errors.contrasena && <div class="invalid-feedback">{errors.contrasena.message}</div>}
                  </Col>
                  <Alert theme="danger" open={error}>
                    {errorMessage}
                  </Alert>
                  <Button theme="danger" className="float-right" type="submit">Darme de Baja</Button>
                </Form>
              </Col>
            </Row>
            </ModalBody>
          </Modal>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default BajaUsuario;
