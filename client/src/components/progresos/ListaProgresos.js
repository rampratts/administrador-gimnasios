import React, { useState, useEffect } from 'react';
import {  Row, Col, Card, CardHeader, CardBody, FormSelect, Button } from "shards-react";
import { NavLink } from 'react-router-dom';
import Spinner from '../utils/Spinner';
import ProgresoItem from './ProgresoItem';
import UserRequests from '../../api/UserRequests';
import ProgresosRequests from '../../api/ProgresosRequests';

function ListaProgresos() {
    const [isLoading, setIsLoading] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState();
    const [progresos, setProgresos] = useState([]);

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
            const res = await ProgresosRequests.progresosCliente();
            setProgresos(res);
        } catch (error) {
            
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getClientes();
    }, [])

    useEffect(() => {
        if(!cliente) return;
        getProgresoCliente();
    }, [cliente])

    return (
        <Row>
            <Col>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <NavLink to="/agregar-progreso" className="float-right">
                    <Button>
                        Agregar Progreso
                    </Button>
                </NavLink>
                <p>Selecciona un cliente para ver sus progresos</p>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                {isLoading ?  <Spinner /> : <React.Fragment/>}
                <FormSelect className="col-6 ml-3 mt-3" onChange={(e) => setCliente(e.target.value)}>
                    <option value="" selected disabled hidden>Seleccionar Cliente...</option>
                    {clientes.map(cliente => <option value={cliente.id}>{cliente.nombre}</option>)}
                </FormSelect>
           
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
