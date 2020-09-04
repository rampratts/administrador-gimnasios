import React, { useState } from 'react';
import {
    Card, Alert,
  } from "shards-react";

import DatosIniciales from './DatosIniciales';
import PasswordStep from './PasswordStep';

const AgregarUsuarioForm = () => {
    const [contrasenaStep, setContrasenaStep] = useState(false);
    const [formData, setFormData] = useState({});
    const [contrasena, setContrasena] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);

    const saveData = data => {
        setFormData(data);
        setContrasenaStep(true);
    }

    const saveContrasena = pass => {
      setContrasena(pass);
      onSubmit();
    }

    const onSubmit = () => {
      //submitear data
      //mostrar spinner
      //mostrar mensaje de success
      //limpiar state
      setFormData({});
      setContrasena('');
      setContrasenaStep(false);
      setAlertOpen(true);
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
