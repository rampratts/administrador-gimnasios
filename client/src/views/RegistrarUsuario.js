import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import AgregarUsuarioForm from "../components/agregar-usuario/AgregarUsuarioForm";

const RegistrarUsuario = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Agregar Usuario" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
        <Col lg="9">
            <AgregarUsuarioForm/>
        </Col>
    </Row>
  </Container>
);

export default RegistrarUsuario;
