import React from "react";

import {
  Row,
  Col,
  Container,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import EnviarSugerenciasForm from "../components/sugerencias/EnviarSugerenciasForm";


const EnviarSugerencias = () => (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Envía una sugerencia a la administración" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
            <Col lg="9">
                <EnviarSugerenciasForm />
            </Col>
        </Row>
    </Container>
)

export default EnviarSugerencias;
