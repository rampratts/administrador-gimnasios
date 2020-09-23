import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from "shards-react";
import UserRequests from '../../api/UserRequests';
import ClienteItem from './ClienteItem';

const ListaClientes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    setIsLoading(true);
    try {
      const res = await UserRequests.clientes();
      if(!res.data.error) {
        setClientes(res.data);
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Clientes</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
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
                    Apellido
                  </th>
                  <th scope="col" className="border-0">
                    Deuda
                  </th>
                  <th scope="col" className="border-0">
                    Pago Mensual
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente, index) => <ClienteItem cliente={cliente} numero={index + 1} key={index}/>)}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ListaClientes;
