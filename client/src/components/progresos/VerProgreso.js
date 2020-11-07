import React, { useState } from 'react';
import { Button, Col, FormInput, Row, Form, Modal, ModalHeader, ModalBody } from "shards-react";

const NuevoPago = ({isOpen, toggle, progreso}) => {
  const date = new Date(progreso.fecha);

  return (
    <Modal open={isOpen} toggle={toggle}>
      <ModalHeader>Progreso</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
             <p>Fecha: {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getFullYear()}</p>
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
