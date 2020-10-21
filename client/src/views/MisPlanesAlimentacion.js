import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ListaMisPlanesAlimentacion from "../components/plan-alimentacion/ListaMisPlanesAlimentacion";


const MisPlanesAlimentacion = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Plan de Alimentacion" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
        <Col lg="9">
          <ListaMisPlanesAlimentacion />
        </Col>
    </Row>
  </Container>
);

export default MisPlanesAlimentacion;
