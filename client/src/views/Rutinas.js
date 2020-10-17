import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ListaRutinas from "../components/rutinas/ListaRutinas";

const Rutinas = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Rutinas" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
        <Col lg="9">
          <ListaRutinas />
        </Col>
    </Row>
  </Container>
);

export default Rutinas;
