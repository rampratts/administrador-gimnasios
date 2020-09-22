import React from 'react';
import {
    Card,
    CardHeader
  } from "shards-react";

const ListaPagos = ({id}) => {
  const text = id ? 'Aqui ira la lista de pagos de un solo cliente' : 'Aqui ira la lista de pagos de todos los clientes';
  return (
    <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center ">
            <h4>{text}</h4>
        </CardHeader>
    </Card>
  );
}

export default ListaPagos;
