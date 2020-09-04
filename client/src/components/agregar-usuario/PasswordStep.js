import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  Button,
  Form,
  Fade
} from "shards-react";
import { useForm } from 'react-hook-form';


const PasswordStep = ({setData}) => {
  const { register, handleSubmit, errors} = useForm();

  const onSubmit = (data) => {
    setData(data);
  }

  return (
    <Fade>
      <CardHeader className="border-bottom text-center ">
        <h4>Ingrese una Contraseña</h4>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Col md="6" className="form-group">
                  <label htmlFor="primera-contrasena">Contraseña</label>
                  <FormInput
                      id="primera"
                      placeholder="Contraseña"
                      type="password"
                      name="primera_contraseña"
                      innerRef={register({required: 'Indique su contraseña', minLength: {value: 6, message:'La contraseña debe contener al menos 6 caracteres'}})}
                      invalid={errors.primera_contraseña}
                  />
                  {errors.primera_contraseña && <div class="invalid-feedback">{errors.primera_contraseña.message}</div>}
                </Col>
                {/* Segunda contrasena */}
                <Col md="6" className="form-group">
                    <label htmlFor="segunda-contrasena">Debe ingresar su contraseña nuevamente</label>
                    <FormInput
                        id="segunda-contrasena"
                        placeholder="Contraseña nuevamente"
                        type="password"
                        name="segunda_contrasena"
                        innerRef={register({required: 'Indique su contraseña nuevamente', minLength: {value: 6, message:'La contraseña debe contener al menos 6 caracteres'}})}
                        invalid={errors.segunda_contrasena}
                    />
                    {errors.segunda_contrasena && <div class="invalid-feedback">{errors.segunda_contrasena.message}</div>}
                </Col>
                <Button theme="accent" className="float-right" type="submit">Agregar Usuario</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Fade>
  );
}

export default PasswordStep;
