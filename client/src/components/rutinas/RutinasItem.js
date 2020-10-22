import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "shards-react";

const RutinasItem = ({rutina, numero}) => {
    return (
        <tr>
            <td>{numero}</td>
            <td>{rutina.nombre}</td>
            <td>{rutina.duracion}</td>
            <td>{rutina.profesor}</td>
            <td>
                <NavLink to={`/rutina?id=${rutina.id}`}>
                    <Button>Ver Rutina</Button>
                </NavLink>
            </td>
        </tr>
    );
}

export default RutinasItem;