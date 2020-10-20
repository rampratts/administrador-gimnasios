import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "shards-react";

const PlanAlimentacionItem = ({planAlimentacion, numero}) => {
    return (
        <tr>
            <td>{numero}</td>
            <td>{planAlimentacion.nombre}</td>
            <td>{planAlimentacion.profesor}</td>
            <td>
                <NavLink to={`/plan-alimentacion?id=${planAlimentacion.id}`}>
                    <Button>Ver Plan Alimentacion</Button>
                </NavLink>
            </td>
        </tr>
    );
}

export default PlanAlimentacionItem;
