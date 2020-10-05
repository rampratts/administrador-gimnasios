import React, { useState } from 'react';
import {
    Card, Alert,
  } from "shards-react";
import Spinner from '../utils/Spinner';

import DatosIniciales from './DatosIniciales';
import PasswordStep from './PasswordStep';
import request from '../../api/axios.instance';
import UserRequests from '../../api/UserRequests';

const AgregarUsuarioForm = () => {
    const [contrasenaStep, setContrasenaStep] = useState(false);
    const [formData, setFormData] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const saveData = async data => {
        setIsloading(true);
        setAlertOpen(false);
        const res = await UserRequests.comprobarNombreUsuario(data.nombre_usuario);
        setIsloading(false);

        if(!res.data.disponible) {
            setSuccess(false);
            setErrorMessage('El nombre de usuario ya está registrado. Por favor elige otro.');
            setAlertOpen(true);
        } else {
            setFormData(data);
            setContrasenaStep(true);
        }
    }

    const saveContrasena = contrasena => {
      onSubmit(contrasena);
    }

    const onSubmit = async (contrasena) => {
        setIsloading(true);
        const newUserData = {...formData, contrasena};

        try {
            await request.post('users/register', newUserData);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            setErrorMessage('Hubo un error al procesar la solicitud. Por favor intenta de nuevo.');
        }

        setFormData({});
        setContrasenaStep(false);
        setAlertOpen(true);
        setIsloading(false);
    }

    const dismiss = () => {
      setAlertOpen(false);
    }

    return (
      <React.Fragment>
        <Alert theme={success ? 'success' : 'danger'} dismissible={dismiss} open={alertOpen}>
            {success ?
                <span>El usuario fue creado correctamente.</span>
                :
                <span>{errorMessage}</span>
            }
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
