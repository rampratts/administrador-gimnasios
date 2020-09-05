import React, { useState, createContext } from 'react';

export const UserContext = createContext({});

export const UserProvider = props => {
    const [userInfo, setUserInfo] = useState({
        isLogged: false,
        nombre_usuario: '',
        tipo_usuario: '',
    });

    return (
        <UserContext.Provider value={[userInfo, setUserInfo]}>
            {props.children}
        </UserContext.Provider>
    )
}
