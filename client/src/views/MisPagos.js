import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ListaPagos from "../components/pagos/ListaPagos";

const MisPagos = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Pagos" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
        <Col lg="9">
          <ListaPagos id="123123"/>
        </Col>
    </Row>
  </Container>
);

export default MisPagos;
