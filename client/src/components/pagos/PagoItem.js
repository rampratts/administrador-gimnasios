import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";


const PagoItem = ({pago, numero}) => {
  return (
        <tr>
          <td>{numero}</td>
          <td>{pago.cantidad}</td>
          <td>{pago.fecha_pago}</td>
          <td>{pago.estado_pago ? 'Pagado' : 'No Pagado'}</td>
          <td>{pago.estado_pago ? <React.Fragment/>: <Button>Marcar Pago</Button>}</td>
        </tr>
  );
}

export default PagoItem;
