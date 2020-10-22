import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import RutinaDetalle from "../components/rutinas/RutinaDetalle";
import AsignarRutina from "../components/rutinas/AsignarRutina";

const Rutina = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Rutina" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
        <Col lg="9">
          <RutinaDetalle />
        </Col>

        <Col lg="3" md="12">
          <AsignarRutina />
        </Col>
    </Row>
  </Container>
);

export default Rutina;
