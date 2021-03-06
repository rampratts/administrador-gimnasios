import React from "react";

import {
  Row,
  Col,
  Container,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import AgregarRutinaForm from "../components/rutinas/AgregarRutinaForm";

const AgregarRutina = () => (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Agregar Rutina" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
            <Col lg="9">
                <AgregarRutinaForm/>
            </Col>
        </Row>
    </Container>
)

export default AgregarRutina;
