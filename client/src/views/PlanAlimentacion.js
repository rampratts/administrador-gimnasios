import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import PlanAlimentacionDetalle from "../components/plan-alimentacion/PlanAlimentacionDetalle";
import AsignarPlanAlimentacion from "../components/plan-alimentacion/AsignarPlanAlimentacion";

const PlanAlimentacion = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Plan de Alimentacion" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
        <Col lg="9">
          <PlanAlimentacionDetalle />
        </Col>

        <Col lg="3" md="12">
          <AsignarPlanAlimentacion />
        </Col>
    </Row>
  </Container>
);

export default PlanAlimentacion;
