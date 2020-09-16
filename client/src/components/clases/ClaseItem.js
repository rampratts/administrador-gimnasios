import React, { useContext, useState } from 'react';

import {
    Card,
    CardBody,
    Button,
    CardFooter,
    CardTitle,
    Col,
    Alert
  } from "shards-react";
import ClasesRequests from '../../api/ClasesRequests';
import { UserContext } from '../../context/UserContext';

const ClaseItem = ({clase, registrado}) => {
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [registradoConExito, setRegistradoConExito] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useContext(UserContext);
    const registrar = async () => {
        setIsLoading(true);
        try {
            await ClasesRequests.registrarUsuarioEnClase(clase.id);
            setRegistradoConExito(true);
        } catch (error) {
            setRegistradoConExito(false);
        }
        setIsLoading(false);
        setMostrarAlert(true);
    }

    return (
        <Col lg="6">
            <Card className="card-post mb-4" small idx={clase.id}>
                <CardBody className="pb-0">
                <CardTitle>{clase.nombre}</CardTitle>
                <ul className="pl-3">
                    <li>Descripcion: {clase.descripcion}</li>
                    <li>Horario: {clase.horario}</li>
                    <li>Dias: 
                    <ul>
                        {clase.lunes ? <li>Lunes</li> : ""}
                        {clase.martes ? <li>Martes</li> : ""}  
                        {clase.miercoles ? <li>Miercoles</li> : ""} 
                        {clase.jueves ? <li>Jueves</li> : ""} 
                        {clase.viernes ? <li>Viernes</li> : ""} 
                        {clase.sabado ? <li>Sabado</li> : ""} 
                        {clase.domingo ? <li>Domingo</li> : ""} 
                    </ul>
                    </li>
                    <li>Profesor: {clase.nombre_profesor}</li>
                </ul>
                </CardBody>
                <CardFooter className="border-top">
                    {userInfo.tipo_usuario === 'cliente' ?
                        registrado ? 
                            <p>Ya estás registrado en esta clase.</p>
                            :
                            mostrarAlert ?
                                <Alert theme={registradoConExito ? "success" : "danger"}>{registradoConExito ? "Registrado con éxito." : "Ha ocurrido un error. Por favor vuelve a intentarlo más tarde."}</Alert>
                                :
                                <Button className="float-right" disabled={isLoading} onClick={registrar}>Registrarme</Button>
                            
                        :
                        <React.Fragment/>
                    }

                </CardFooter>
            </Card>
        </Col>
    );
}

export default ClaseItem;