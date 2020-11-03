import React, { useState, useEffect } from 'react';
import {  Row, Col, Card, CardHeader, CardBody, FormSelect, Button, Alert } from "shards-react";
import Spinner from '../utils/Spinner';
import ProgresoItem from './ProgresoItem';
import UserRequests from '../../api/UserRequests';
import ProgresosRequests from '../../api/ProgresosRequests';
import AgregarProgresoForm from './AgregarProgresoForm';

function ListaProgresos() {
    const [isLoading, setIsLoading] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({});
    const [progresos, setProgresos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const getClientes = async () => {
        setIsLoading(true);
        try {
            const res = await UserRequests.clientes();
            setClientes(res.data);
        } catch (error) {
        }
        setIsLoading(false);
    }

    const getProgresoCliente = async () => {
        setIsLoading(true);
        try {
            const res = await ProgresosRequests.progresosCliente(cliente);
            setProgresos(res.data);
        } catch (error) {
            
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getClientes();
    }, [])

    useEffect(() => {
        if(!Object.keys(cliente).length) return;
        getProgresoCliente();
    }, [cliente])

    const toggle = (isSuccess) => {
        setSuccess(isSuccess);
        setAlertOpen(true);
        setIsModalOpen(!isModalOpen);
        getProgresoCliente();
    }

    return (
        <Row>
            <Col>
            <Alert theme={success ? 'success' : 'danger'} dismissible={() => setAlertOpen(false)} open={alertOpen}>
                {success ?
                    <span>El progreso fue creado correctamente.</span>
                    :
                    <span>Ha ocurrido un error al crear el progreso. Por favor vuelve a intentarlo.</span>
                }
            </Alert>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <Button className="float-right" onClick={() => setIsModalOpen(true)} disabled={!Object.keys(cliente).length}>
                    Agregar Progreso
                </Button>
                <p>Selecciona un cliente para ver sus progresos</p>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                {isLoading ?  <Spinner /> : <React.Fragment/>}
                <FormSelect className="col-6 ml-3 mt-3" onChange={(e) => setCliente(e.target.value)}>
                    <option value="" selected disabled hidden>Seleccionar Cliente...</option>
                    {clientes.map(cliente => <option value={cliente.id}>{cliente.nombre}</option>)}
                </FormSelect>

                <AgregarProgresoForm isOpen={isModalOpen} toggle={toggle} cliente={cliente}/>
           
                <table className="table mb-0">
                <thead className="bg-light">
                    <tr>
                        <th scope="col" className="border-0">
                        #
                        </th>
                        <th scope="col" className="border-0">
                        Descripción
                        </th>
                        <th scope="col" className="border-0">
                        Fecha
                        </th>
                        <th scope="col" className="border-0">
                        Profesor
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {progresos.map((progreso, index) => (<ProgresoItem progreso={progreso} numero={index + 1} key={index}/>))}
                    </tbody>
                </table>
                </CardBody>
            </Card>
            </Col>
        </Row>
    )
}

export default ListaProgresos;
