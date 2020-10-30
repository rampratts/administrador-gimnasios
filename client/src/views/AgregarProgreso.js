import React from "react";

import {
  Row,
  Col,
  Container,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import AgregarProgresoForm from "../components/progresos/AgregarProgresoForm";

const AgregarProgreso = () => (
        <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        <PageTitle title="Agregar Progreso" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
            <Col lg="9">
                <AgregarProgresoForm />
            </Col>
        </Row>
    </Container>
)

export default AgregarProgreso;