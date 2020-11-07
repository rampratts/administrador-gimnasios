import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "shards-react";

const SugerenciaItem = ({sugerencia, numero}) => {
    const date = new Date(sugerencia.fecha);
    return (
        <tr>
            <td>{numero}</td>
            <td>{sugerencia.nombre} {sugerencia.apellido}</td>
            <td>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getFullYear()}</td>
            <td>
                <NavLink to={`/sugerencia?id=${sugerencia.id}`}>
                    <Button>Ver Sugerencia</Button>
                </NavLink>
            </td>
        </tr>
    );
}

export default SugerenciaItem;