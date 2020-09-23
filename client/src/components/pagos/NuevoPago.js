import React, { useState } from 'react';
import { Button, Col, FormInput, Row, Form, Modal, ModalHeader, ModalBody, Alert } from "shards-react";
import { useForm } from 'react-hook-form';
import PagosRequests from '../../api/PagosRequests';

const NuevoPago = ({isOpen, toggle, cliente}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { register, handleSubmit, errors} = useForm({
    defaultValues: {
      cantidad: cliente.pago_mensual
    }
  });

  const onSubmit = async data => {
    setIsLoading(true);
    const pago = {...data, cliente: cliente.id, estado_pago: false}

    try {
      await PagosRequests.crearPago(pago);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
    setAlertOpen(true);
    setIsLoading(false);
  }

  return (
    <Modal open={isOpen} toggle={toggle}>
      <ModalHeader>Agregar Nuevo pago para {cliente.nombre} {cliente.apellido}</ModalHeader>
      <ModalBody>
      <Row>
          <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Fecha de Pago*/}
                  <Col md="6" className="form-group">
                      <label htmlFor="fecha-pago">Fecha a realizar el pago</label>
                      <FormInput
                          id="fecha-pago"
                          placeholder="Fecha"
                          type="date"
                          name="fecha_pago"
                          innerRef={register({required: 'Indique una fecha' })}
                          invalid={errors.fecha_pago}
                      />
                      {errors.fecha_pago && <div class="invalid-feedback">{errors.fecha_pago.message}</div>}
                  </Col>

                  {/* Monto */}
                  <Col md="6" className="form-group">
                      <label htmlFor="monto">Monto del Pago</label>
                      <FormInput
                          id="monto"
                          placeholder="Monto"
                          type="number"
                          step="0.01"
                          name="cantidad"
                          innerRef={register({required: 'Indique un monto' })}
                          invalid={errors.cantidad}
                      />
                      {errors.cantidad && <div class="invalid-feedback">{errors.cantidad.message}</div>}
                  </Col>
                  <Alert theme={success ? 'success' : 'danger'} dismissible={() => setAlertOpen(false)} open={alertOpen}>
                    {success ?
                        <span>La clase fue creada correctamente.</span>
                        :
                        <span>Ha ocurrido un error. Por favor vuelve a intentarlo.</span>
                    }
                  </Alert>
                  <Button className="float-right" disabled={isLoading} type="submit">Agregar Pago</Button>
              </Form>
            </Col>
          </Row>
      </ModalBody>
    </Modal>
  )
}

export default NuevoPago;
