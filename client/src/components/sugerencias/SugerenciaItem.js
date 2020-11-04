import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "shards-react";

const SugerenciaItem = ({sugerencia, numero}) => {
    return (
        <tr>
            <td>{numero}</td>
            <td>{sugerencia.usuario_id}</td>
            <td>{sugerencia.fecha}</td>
            <td>
                <NavLink to={`/sugerencia?id=${sugerencia.id}`}>
                    <Button>Ver Sugerencia</Button>
                </NavLink>
            </td>
        </tr>
    );
}

export default SugerenciaItem;