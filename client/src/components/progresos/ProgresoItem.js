import React, { useState } from 'react';
import { Button } from "shards-react";
import VerProgreso from "./VerProgreso";

const ProgresoItem = ({progreso, numero}) => {
    const styles = {width: '28vw', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'block'};
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggle = () => {
      setIsModalOpen(!isModalOpen);
    }
    return (
        <React.Fragment>
            <VerProgreso  isOpen={isModalOpen} toggle={toggle} progreso={progreso}/>
            <tr>
                <td>{numero}</td>
                <td><span style={styles}>{progreso.descripcion}</span></td>
                <td>{progreso.fecha}</td>
                <td>{progreso.profesor}</td>
                <td>
                    <Button onClick={toggle}>Ver Más</Button>
                </td>
            </tr>
        </React.Fragment>

    );
}

export default ProgresoItem;