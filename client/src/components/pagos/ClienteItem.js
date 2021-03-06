import React, { useState } from 'react';
import { Button } from "shards-react";
import { NavLink } from "react-router-dom";
import NuevoPago from './NuevoPago';


const ClienteItem = ({cliente, numero, nuevoPago}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = (isSuccess) => {
    nuevoPago(isSuccess);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <React.Fragment>
      <NuevoPago isOpen={isModalOpen} toggle={toggle} cliente={cliente}/>
      <tr>
          <td>{numero}</td>
          <td>{cliente.nombre}</td>
          <td>{cliente.apellido}</td>
          <td>{cliente.deuda ? <span className='text-danger'>${cliente.deuda}</span> : <span>Al día</span>}</td>
          <td>{cliente.pago_mensual}</td>
          <td>
              <NavLink to={`/pago?id=${cliente.id}`}>
              <Button>Ver Pagos</Button>
              </NavLink>
          </td>
          <td><Button onClick={toggle}>Nuevo pago</Button></td>
      </tr>
    </React.Fragment>

  );
}

export default ClienteItem;
