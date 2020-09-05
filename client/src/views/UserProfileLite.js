import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import BajaUsuario from "../components/user-profile-lite/BajaUsuario";

const UserProfileLite = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Mi Perfil" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="6">
        <UserDetails />
      </Col>
      <Col lg="6">
        <BajaUsuario />
      </Col>
    </Row>
  </Container>
);

export default UserProfileLite;
