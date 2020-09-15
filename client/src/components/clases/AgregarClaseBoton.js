import React, { useContext } from 'react';

import{
Button,
} from "shards-react";
import { NavLink } from "react-router-dom";


import { UserContext } from '../../context/UserContext';

const AgregarClaseBoton = ({history}) => {
    const [userInfo, setUserInfo] = useContext(UserContext);

    const redirect = () => {
        
    }

    if(userInfo.tipo_usuario === 'admin' || userInfo.tipo_usuario === 'prof') {
        return (
            <NavLink to="/agregar-clase" onClick={redirect} className="float-right">
                <Button>
                    Agregar Clase
                </Button>
            </NavLink>
        )
    }
}

export default AgregarClaseBoton;