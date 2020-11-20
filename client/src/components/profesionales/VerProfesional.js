import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody } from "shards-react";

const VerProfesional = ({isOpen, toggle, profesional}) => {
  return (
    <Modal open={isOpen} toggle={toggle}>
      <ModalHeader>Profesional</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
             <p>Nombre: {profesional.nombre} {profesional.apellido}</p>
          </Col>
          <Col>
              <p>Área: {profesional.area} </p>
          </Col>
        </Row>
        <Row>
            <Col>
                <p>Calificado: {profesional.calificado ? 'Sí' : 'No'}</p>
            </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default VerProfesional;
