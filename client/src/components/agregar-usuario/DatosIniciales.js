import React, { useState } from 'react';
import {
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  FormTextarea,
  Button,
  Form,
  FormSelect,
  FormCheckbox,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Fade
} from "shards-react";
import { useForm } from 'react-hook-form';


const DatosIniciales = ({setData}) => {
  const { register, handleSubmit, errors} = useForm();
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [calificado, setCalificado] = useState(false);

  const saveData = data => {
    setData(data);
}

  return (
    <React.Fragment>
      <CardHeader className="border-bottom text-center ">
          <h4>Ingrese los datos</h4>
      </CardHeader>
      <ListGroup flush>
          <ListGroupItem className="p-3">
              <Row>
              <Col>
                  <Form onSubmit={handleSubmit(saveData)}>
                      <Row form>
                          {/* Nombre */}
                          <Col md="6" className="form-group">
                              <label htmlFor="feFirstName">Nombre</label>
                              <FormInput
                                  id="feFirstName"
                                  placeholder="Nombre"
                                  name="nombre"
                                  innerRef={register({required: 'Por favor indique un nombre'})}
                                  invalid={errors.nombre}
                              />
                              {errors.nombre && <div class="invalid-feedback">{errors.nombre.message}</div>}
                          </Col>
                          {/* Apellido */}
                          <Col md="6" className="form-group">
                              <label htmlFor="feLastName">Apellido</label>
                              <FormInput
                                  id="feLastName"
                                  placeholder="Apellido"
                                  name="apellido"
                                  innerRef={register({required: 'Por favor indique un apellido'})}
                                  invalid={errors.apellido}
                              />
                              {errors.apellido && <div class="invalid-feedback">{errors.apellido.message}</div>}
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
                                  innerRef={register({required: 'Indique un email'})}
                                  autoComplete="email"
                                  invalid={errors.email}
                              />
                              {errors.email && <div class="invalid-feedback">{errors.email.message}</div>}
                          </Col>
                          {/* Email */}
                          <Col md="6" className="form-group">
                            <label htmlFor="nombre-usuario">Nombre de Usuario</label>
                            <FormInput
                                type="text"
                                id="nombre-usuario"
                                placeholder="Nombre de Usuario"
                                name="nombre_usuario"
                                innerRef={register({required: 'Escriba un nombre de usuario'})}
                                invalid={errors.nombre_usuario}
                            />
                            {errors.nombre_usuario && <div class="invalid-feedback">{errors.nombre_usuario.message}</div>}
                          </Col>
                          {/* Fecha Nacimiento */}
                          <Col md="6" lg="3" className="form-group">
                              <label htmlFor="fecha-nacimiento">Fecha de Nacimiento</label>
                              <FormInput
                                id="fecha-nacimiento"
                                type="date"
                                name="fecha_nacimiento"
                                innerRef={register({required: 'Seleccione una fecha'})}
                                invalid={errors.fecha_nacimiento}
                                />
                              {errors.fecha_nacimiento && <div class="invalid-feedback">{errors.fecha_nacimiento.message}</div>}
                          </Col>
                          {/*Fecha Inicio*/}
                          <Col md="6" lg="3" className="form-group">
                          <label htmlFor="fecha-inicio">Fecha de Inicio</label>
                          <FormInput
                            id="fecha-inicio"
                            type="date"
                            name="fecha_inicio"
                            innerRef={register({required: 'Seleccione una fecha'})}
                            invalid={errors.fecha_inicio}
                            />
                            {errors.fecha_inicio && <div class="invalid-feedback">{errors.fecha_inicio.message}</div>}
                      </Col>
                      </Row>
                      <Row form>
                          {/* Documento Identidad */}
                          <Col md="6" className="form-group">
                              <label htmlFor="documento-identidad">Documento de Identidad</label>
                              <FormInput
                                  id="documento-identidad"
                                  placeholder="Documento de Identidad"
                                  name="documento_identidad"
                                  innerRef={register({required: 'Indique un documento de identidad'})}
                                  invalid={errors.documento_identidad}
                              />
                              {errors.documento_identidad && <div class="invalid-feedback">{errors.documento_identidad.message}</div>}
                          </Col>
                          {/* Documento Identidad */}
                          <Col md="6" className="form-group">
                              <label htmlFor="tel">Telefono</label>
                              <FormInput
                                  id="tel"
                                  placeholder="Telefono"
                                  name="telefono"
                                  innerRef={register({required: 'Indique un número de teléfono'})}
                                  invalid={errors.telefono}
                              />
                              {errors.telefono && <div class="invalid-feedback">{errors.telefono.message}</div>}
                          </Col>
                          {/* Tipo Usuario */}
                          <Col md="4" className="form-group">
                              <label htmlFor="tipo-usuario">Tipo Usuario</label>
                              <FormSelect id="tipo-usuario" name="tipo_usuario" innerRef={register({required: 'Seleccione tipo de usuario'})} invalid={errors.tipo_usuario} onChange={e => setTipoUsuario(e.target.value)}>
                                  <option value="" selected disabled hidden>Seleccionar...</option>
                                  <option value="cliente">Cliente</option>
                                  <option value="prof">Profesor</option>
                                  <option value="admin">Administrativo</option>
                              </FormSelect>
                              {errors.tipo_usuario && <div class="invalid-feedback">{errors.tipo_usuario.message}</div>}
                          </Col>
                      </Row>
                      <Row form>
                          {/* Area */}
                          {
                            (tipoUsuario === 'admin') || (tipoUsuario === 'prof') ?
                              <Col md="6" className="form-group">
                                <label htmlFor="feDescription">Area</label>
                                <FormTextarea id="feDescription" rows="2" name="area" invalid={errors.area} innerRef={register({required: 'Indique el area'})}/>
                                {errors.area && <div class="invalid-feedback">{errors.area.message}</div>}
                              </Col>
                            :
                              <React.Fragment/>
                          }

                          {/* Calificado (prof) */}
                          {
                            tipoUsuario === 'prof' ?
                              <Col sm="6">
                              <p className="mb-2">Calificado</p>
                                <FormCheckbox
                                  toggle
                                  name="calificado"
                                  innerRef={register}
                                  checked={calificado}
                                  onChange={e => setCalificado(!calificado)}
                                  />
                              </Col>
                            :
                              <React.Fragment/>
                          }

                          {/* Cliente  */}
                          {
                            tipoUsuario === 'cliente' ?
                            <Fade>
                              <Row className="mb-2">
                                <Col lg="4">
                                  <InputGroup className="mb-2">
                                    <InputGroupAddon type="prepend">
                                      <InputGroupText>$</InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput
                                      id="pago-mensual"
                                      placeholder="Pago Mensual"
                                      name="pago_mensual"
                                      innerRef={register({required: 'Indique el pago mensual'})}
                                      type="number"
                                      invalid={errors.pago_mensual}
                                      />
                                      {errors.pago_mensual && <div class="invalid-feedback">{errors.pago_mensual.message}</div>}
                                  </InputGroup>
                                </Col>

                                <Col lg="4">
                                  <InputGroup className="mb-2">
                                    <InputGroupAddon type="prepend">
                                      <InputGroupText>Kg.</InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput
                                      id="peso-actual"
                                      placeholder="Peso Actual"
                                      name="peso_actual"
                                      innerRef={register}
                                      type="number"
                                      />
                                  </InputGroup>
                                </Col>

                                <Col lg="4">
                                  <InputGroup className="mb-2">
                                    <InputGroupAddon type="prepend">
                                      <InputGroupText>IMC.</InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput
                                      id="imc"
                                      placeholder="IMC"
                                      name="imc"
                                      innerRef={register}
                                      type="number"
                                      />
                                  </InputGroup>
                                </Col>
                              </Row>
                            </Fade>
                            :
                              <React.Fragment/>
                          }
                      </Row>
                      <Button theme="accent" className="float-right" type="submit">Siguiente</Button>
                      </Form>
                  </Col>
              </Row>
          </ListGroupItem>
      </ListGroup>
    </React.Fragment>
  );
}

export default DatosIniciales;
