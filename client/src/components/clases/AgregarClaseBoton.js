import React, { useContext } from 'react';

import{
Button
} from "shards-react";
import { NavLink } from "react-router-dom";


import { UserContext } from '../../context/UserContext';

const AgregarClaseBoton = () => {
    const [userInfo] = useContext(UserContext);

    if(userInfo.tipo_usuario === 'admin' || userInfo.tipo_usuario === 'prof') {
        return (
            <NavLink to="/agregar-clase" className="float-right">
                <Button>
                    Agregar Clase
                </Button>
            </NavLink>
        )
    } else {
        return (<React.Fragment></React.Fragment>)
    }
}

export default AgregarClaseBoton;