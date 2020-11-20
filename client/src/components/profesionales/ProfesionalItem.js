import React, { useState } from 'react';
import { Button } from "shards-react";
import VerProfesional from "./VerProfesional";

const ProfesionalItem = ({profesional, numero}) => {
    const styles = {width: '28vw', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'block'};
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggle = () => {
      setIsModalOpen(!isModalOpen);
    }
    return (
        <React.Fragment>
            <VerProfesional isOpen={isModalOpen} toggle={toggle} profesional={profesional}/>
            <tr>
                <td>{numero}</td>
                <td><span style={styles}>{profesional.nombre} {profesional.apellido}</span></td>
                <td>{profesional.area}</td>
                <td>{profesional.calificado ? 'Sí' : 'No'}</td>
                <td>
                    <Button onClick={toggle}>Ver Más</Button>
                </td>
            </tr>
        </React.Fragment>

    );
}

export default ProfesionalItem;
