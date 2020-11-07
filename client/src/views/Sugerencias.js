import React from "react";

import {
  Row,
  Col,
  Container,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SugerenciasList from "../components/sugerencias/SugerenciasList";


const EnviarSugerencias = () => (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Sugerencias" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
            <Col lg="9">
                <SugerenciasList />
            </Col>
        </Row>
    </Container>
)

export default EnviarSugerencias;
