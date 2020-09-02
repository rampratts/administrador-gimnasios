import React from 'react';
import {
    Card,
    CardHeader
  } from "shards-react";

const InformacionInicio = () => (
    <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center ">
            <h4>¡Bienvenido!</h4>
            <p className="text-justify">Esta es la página de inicio. Explora todas las opciones en el menú lateral a la izquierda.</p>
        </CardHeader>
    </Card>
);

export default InformacionInicio;