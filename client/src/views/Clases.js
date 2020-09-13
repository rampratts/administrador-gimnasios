import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ListaClases from "../components/clases/ListaClases";
import AgregarClase from "../components/clases/AgregarClase";

const Clases = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="flex-column flex-lg-row justify-content-end no-gutters page-header py-4 row">
      <PageTitle title="Clases" md="12" className="ml-sm-auto mr-sm-auto" />
      <AgregarClase/>
    </Row>
    <Row>
        <Col lg="9">
          <ListaClases />
        </Col>
    </Row>
  </Container>
);

export default Clases;
