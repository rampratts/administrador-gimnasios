import React, { useState } from 'react';
import {
    Card, Alert,
  } from "shards-react";
import Spinner from '../utils/Spinner';

import DatosIniciales from './DatosIniciales';
import PasswordStep from './PasswordStep';

const AgregarUsuarioForm = () => {
    const [contrasenaStep, setContrasenaStep] = useState(false);
    const [formData, setFormData] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const saveData = data => {
        setFormData(data);
        setContrasenaStep(true);
    }

    const saveContrasena = contrasena => {
      onSubmit(contrasena);
    }

    const onSubmit = (contrasena) => {
        const newUserData = {...formData, contrasena};
        console.log(newUserData)
        setIsloading(true); 
        setTimeout(() => {
            setFormData({});
            setContrasenaStep(false);
            setAlertOpen(true);
            setIsloading(false); 
        }, 5000)
 
    }

    const dismiss = () => {
      setAlertOpen(false);
    }

    return (
      <React.Fragment>
        <Alert theme="success" dismissible={dismiss} open={alertOpen}>
          El usuario fue creado correctamente.
        </Alert>
        <Card small className="mb-4 pt-3">
          {
              isLoading ? <Spinner /> : <React.Fragment/>
          }  
          {
            !contrasenaStep ?
            <DatosIniciales setData={saveData}/>
            :
            <PasswordStep setData={saveContrasena}/>
          }
        </Card>
      </React.Fragment>
    );
}

export default AgregarUsuarioForm;
