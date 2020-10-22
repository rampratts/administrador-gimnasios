import React from "react";

import {
  Row,
  Col,
  Container,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import AgregarPlanAlimentacionForm from "../components/plan-alimentacion/AgregarPlanAlimentacionForm";

const AgregarPlanAlimentacion = () => (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Agregar Plan de Alimentacion" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
            <Col lg="9">
                <AgregarPlanAlimentacionForm/>
            </Col>
        </Row>
    </Container>
)

export default AgregarPlanAlimentacion;
