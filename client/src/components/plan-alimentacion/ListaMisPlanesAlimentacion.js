import React, { useEffect, useState } from 'react';
import {  Row, Col, Card, CardHeader, CardBody} from "shards-react";
import PlanAlimentacionRequests from '../../api/PlanAlimentacionRequests';
import Spinner from '../utils/Spinner'
import PlanAlimentacionItem from './PlanAlimentacionItem';


const ListaMisPlanesAlimentacion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [planes, setPlanes] = useState([]);

  const getPlanesCliente = async () => {
    setIsLoading(true);
    try {
        const res = await PlanAlimentacionRequests.planesCliente(null, true);
        setPlanes(res.data);
    } catch (error) {

    }

    setIsLoading(false);
  }

  useEffect(() => {
    getPlanesCliente();
  }, [])

  return (
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
              <h3>Mis Planes de Alimentacion</h3>
              {!planes.length ? 'No tienes planes asignados.' : <React.Fragment />}
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
                    Profesor
                  </th>
                </tr>
              </thead>
              <tbody>
                {planes.map((plan, index) => (<PlanAlimentacionItem planAlimentacion={plan} numero={index + 1} key={index}/>))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ListaMisPlanesAlimentacion;
