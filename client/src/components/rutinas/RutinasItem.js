import React from 'react';
import { Button } from "shards-react";

const RutinasItem = ({rutina, numero}) => {
    return (
        <tr>
            <td>{numero}</td>
            <td>{rutina.nombre}</td>
            <td>{rutina.duracion}</td>
            <td>{rutina.profesor}</td>
            <td><Button>Ver Rutina</Button></td>
        </tr>
    );
}

export default RutinasItem;