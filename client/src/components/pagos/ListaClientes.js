import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Alert } from "shards-react";
import UserRequests from '../../api/UserRequests';
import Spinner from '../utils/Spinner';
import ClienteItem from './ClienteItem';

const ListaClientes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const getClientes = async () => {
    setIsLoading(true);
    try {
      const res = await UserRequests.clientes();
      if(!res.data.error) {
        setClientes(res.data);
      }
    } catch (error) {
    }
    setIsLoading(false);
  }

  const nuevoPago = (result) => {
    if(typeof result === "boolean") {
      setSuccess(result);
      setAlertOpen(true);
      getClientes();
    }
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
            <Alert theme={success ? 'success' : 'danger'} dismissible={() => setAlertOpen(false)} open={alertOpen}>
              {success ?
                  <span>El pago fue creado correctamente.</span>
                  :
                  <span>Ha ocurrido un error. Por favor vuelve a intentarlo.</span>
              }
            </Alert>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            {isLoading ?  <Spinner/> : <React.Fragment/>}
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
                {clientes.map((cliente, index) => <ClienteItem cliente={cliente} nuevoPago={nuevoPago} numero={index + 1} key={index}/>)}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ListaClientes;
