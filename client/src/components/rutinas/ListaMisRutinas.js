import React, { useEffect, useState } from 'react';
import { NavLink as RouterLink } from "react-router-dom";
import {  Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, FormSelect, Button } from "shards-react";
import RutinasRequests from '../../api/RutinasRequests';
import UserRequests from '../../api/UserRequests';
import Spinner from '../utils/Spinner'
import RutinasItem from './RutinasItem';

const ListaMisRutinas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rutinas, setRutinas] = useState([]);

  const getRutinaCliente = async () => {
    setIsLoading(true);
    try {
        const res = await RutinasRequests.rutinasCliente(null, true);
        setRutinas(res.data);
    } catch (error) {

    }

    setIsLoading(false);
  }

  useEffect(() => {
    getRutinaCliente();
  }, [])

  return (
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
              <h3>Mis Rutinas</h3>
              {!rutinas.length ? 'No tienes rutinas asignadas.' : <React.Fragment />}
          </CardHeader>
          <CardBody className="p-0 pb-3">
            {isLoading ?  <Spinner /> : <React.Fragment/>}
            <table className="table mb-0">
            <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Nombre
                  </th>
                  <th scope="col" className="border-0">
                    Duración
                  </th>
                  <th scope="col" className="border-0">
                    Profesor
                  </th>
                </tr>
              </thead>
              <tbody>
                {rutinas.map((rutina, index) => (<RutinasItem rutina={rutina} numero={index + 1} key={index}/>))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ListaMisRutinas;
