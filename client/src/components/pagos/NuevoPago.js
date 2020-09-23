import React, { useState } from 'react';
import { Button, Col, FormInput, Row, Form, Modal, ModalHeader, ModalBody } from "shards-react";
import Spinner from '../utils/Spinner';
import { useForm } from 'react-hook-form';

const NuevoPago = ({isOpen, toggle, cliente}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors} = useForm({
    defaultValues: {
      monto: cliente.pago_mensual
    }
  });

  const onSubmit = data => {
    console.log(data);
  }

  return (
    <Modal open={isOpen} toggle={toggle}>
      <ModalHeader>Agregar Nuevo pago para {cliente.nombre} {cliente.apellido}</ModalHeader>
      <ModalBody>
      {isLoading ?  <Spinner /> : <React.Fragment/>}
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
                          name="monto"
                          innerRef={register({required: 'Indique un monto' })}
                          invalid={errors.monto}
                      />
                      {errors.monto && <div class="invalid-feedback">{errors.monto.message}</div>}
                  </Col>
                  <Button className="float-right" type="submit">Agregar Pago</Button>
              </Form>
            </Col>
          </Row>
      </ModalBody>
    </Modal>
  )
}

export default NuevoPago;
