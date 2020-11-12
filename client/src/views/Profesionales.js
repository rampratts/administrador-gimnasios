import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ProfesionalesList from "../components/profesionales/ProfesionalesList";

const Profesionales = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Profesionales" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
        <Col lg="9">
          <ProfesionalesList />
        </Col>
    </Row>
  </Container>
);

export default Profesionales;
