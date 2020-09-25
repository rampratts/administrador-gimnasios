import React, { useEffect, useState } from 'react';
import {  Row, Col, Card, CardHeader, CardBody, FormSelect } from "shards-react";
import PagoItem from './PagoItem';
import Spinner from '../utils/Spinner'
import PagosRequests from '../../api/PagosRequests';


const ListaPagos = ({location}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [pagosFiltrados, setPagosFiltrados] = useState([]);

  const getClientes = async () => {
    setIsLoading(true);
    const userId = new URLSearchParams(window.location.search).get('id');
    try {
      let res;
        if(!userId){
          res = await PagosRequests.misPagos();
        } else {
          res = await PagosRequests.obtenerPagos(userId);
        }
        setPagos(res.data);
        setPagosFiltrados(res.data);
    } catch (error) {

    }

    setIsLoading(false);
  }

  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    if(filtro === 'todos') {
      setPagosFiltrados(pagos);
    } else if(filtro === 'pagados') {
      setPagosFiltrados(pagos.filter(pago => pago.estado_pago === true));
    } else if(filtro === 'no-pagados') {
      setPagosFiltrados(pagos.filter(pago => pago.estado_pago === false));
    }
  }, [filtro])

  return (
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Pagos de cliente </h6>
            <FormSelect className="col-3" onChange={(e) => setFiltro(e.target.value)}>
              <option value="" selected disabled hidden>Filtrar...</option>
              <option value="todos">Todos</option>
              <option value="pagados">Pagados</option>
              <option value="no-pagados">No Pagados</option>
            </FormSelect>
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
                {pagosFiltrados.map((pago, index) => <PagoItem pago={pago} numero={index + 1} key={index}/>)}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ListaPagos;
