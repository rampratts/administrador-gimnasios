import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    FormInput,
    FormGroup,
    FormTextarea,
    Button,
    Form,
    FormSelect
  } from "shards-react";
import { useForm } from 'react-hook-form';

const AgregarUsuarioForm = () => {
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <Card small className="mb-4 pt-3">
            <CardHeader className="border-bottom text-center ">
                <h4>Coso pum</h4>
            </CardHeader>
            <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Row>
                    <Col>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row form>
                                {/* First Name */}
                                <Col md="6" className="form-group">
                                    <label htmlFor="feFirstName">Nombre</label>
                                    <FormInput
                                        id="feFirstName"
                                        placeholder="Nombre"
                                        name="nombre"
                                        innerRef={register}
                                    />
                                </Col>
                                {/* Last Name */}
                                <Col md="6" className="form-group">
                                    <label htmlFor="feLastName">Apellido</label>
                                    <FormInput
                                        id="feLastName"
                                        placeholder="Apellido"
                                        name="apellido"
                                        innerRef={register}
                                    />
                                </Col>
                            </Row>
                            <Row form>
                                {/* Email */}
                                <Col md="6" className="form-group">
                                    <label htmlFor="feEmail">Email</label>
                                    <FormInput
                                        type="email"
                                        id="feEmail"
                                        placeholder="Email"
                                        name="email"
                                        innerRef={register}
                                        autoComplete="email"
                                    />
                                </Col>
                                {/* Password */}
                                <Col md="6" className="form-group">
                                    <label htmlFor="fePassword">Password</label>
                                    <FormInput
                                        type="password"
                                        id="fePassword"
                                        placeholder="Password"
                                        value="EX@MPL#P@$$w0RD"
                                        onChange={() => {}}
                                        autoComplete="current-password"
                                    />
                                </Col>
                            </Row>
                            <FormGroup>
                                <FormInput 
                                    type="date"
                                    name="fecha_nacimiento"
                                    innerRef={register}
                                />
                            </FormGroup>
                            <Row form>
                                {/* City */}
                                <Col md="6" className="form-group">
                                    <label htmlFor="feCity">City</label>
                                    <FormInput
                                        id="feCity"
                                        placeholder="City"
                                        onChange={() => {}}
                                    />
                                </Col>
                                {/* State */}
                                <Col md="4" className="form-group">
                                    <label htmlFor="feInputState">State</label>
                                    <FormSelect id="feInputState">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </FormSelect>
                                </Col>
                                {/* Zip Code */}
                                <Col md="2" className="form-group">
                                <label htmlFor="feZipCode">Zip</label>
                                    <FormInput
                                        id="feZipCode"
                                        placeholder="Zip"
                                        onChange={() => {}}
                                    />
                                </Col>
                            </Row>
                            <Row form>
                                {/* Description */}
                                <Col md="12" className="form-group">
                                    <label htmlFor="feDescription">Description</label>
                                    <FormTextarea id="feDescription" rows="5" />
                                </Col>
                            </Row>
                            <Button theme="accent" type="submit">Agregar Usuario</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    );
}

export default AgregarUsuarioForm;