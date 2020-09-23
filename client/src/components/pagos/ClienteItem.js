import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, Collapse } from "shards-react";
import { NavLink } from "react-router-dom";


const ClienteItem = ({cliente, numero, history}) => {
  return (
        <tr>
            <td>{numero}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.apellido}</td>
            <td>{cliente.deuda ? cliente.deuda : 'Al dia'}</td>
            <td>{cliente.pago_mensual}</td>
            <td>
                <NavLink to={`/pago?id=${cliente.id}`}>
                 <Button>Ver Pagos</Button>
                </NavLink>
            </td>
            <td><Button>Nuevo pago</Button></td>
        </tr>
  );
}

export default ClienteItem;
