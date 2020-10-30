import React, { useState } from 'react';
import { Button, Col, FormInput, Row, Form, Modal, ModalHeader, ModalBody } from "shards-react";

const NuevoPago = ({isOpen, toggle, progreso}) => {
  return (
    <Modal open={isOpen} toggle={toggle}>
      <ModalHeader>Progreso</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
             <p>Fecha: {progreso.fecha}</p>
          </Col>
          <Col>
              <p>Profesor: {progreso.profesor}</p>
          </Col>
        </Row>
        <Row>
            <Col>
                <p className="h4">Descripción: </p>
                <p>{progreso.descripcion}</p>
            </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default NuevoPago;
