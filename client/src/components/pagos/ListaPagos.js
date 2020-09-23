import React, { useEffect, useState } from 'react';
import {  Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PagoItem from './PagoItem';


const ListaPagos = ({id}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagos, setPagos] = useState([]);

  const getClientes = async () => {
    setIsLoading(true);
    try {
        setPagos([{
            estado_pago: false,
            fecha_pago: '10-12-2020',
            cantidad: 29.99,
        },
        {
            estado_pago: true,
            fecha_pago: '10-11-2020',
            cantidad: 29.99,
        }]);
    } catch (error) {

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
            <h6 className="m-0">Pagos de cliente NOMBRE_CLIENTE</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
            <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Monto
                  </th>
                  <th scope="col" className="border-0">
                    Fecha de Pago
                  </th>
                  <th scope="col" className="border-0">
                    Estado De pago
                  </th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((pago, index) => <PagoItem pago={pago} numero={index + 1} key={index}/>)}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ListaPagos;
