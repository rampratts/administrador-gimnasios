import React, { useState, createContext } from 'react';

export const UserContext = createContext('');

export const UserProvider = props => {
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState('');

    return (
        <UserContext.Provider value={[isLogged, setIsLogged], [username, setUsername]}>
            {props.children}
        </UserContext.Provider>
    )
}
