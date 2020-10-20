import React, { useEffect, useState } from 'react';
import { NavLink as RouterLink } from "react-router-dom";
import {  Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, FormSelect, Button } from "shards-react";
import PlanAlimentacionRequests from '../../api/PlanAlimentacionRequests';
import UserRequests from '../../api/UserRequests';
import Spinner from '../utils/Spinner'
import PlanAlimentacionItem from './PlanAlimentacionItem';

const ListaPlanes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [planesAlimentacion, setPlanesAlimentacion] = useState([]);
  const [cliente, setCliente] = useState();
  const [clientes, setClientes] = useState([]);
  const [listaSeleccionada, setListaSeleccionada] = useState('TODAS');

  const getPlanes = async () => {
    setIsLoading(true);
    try {
        const res = await PlanAlimentacionRequests.obtenerTodosLosPlanes();
        if(!res.data.error) {
          setPlanesAlimentacion(res.data);
        }
    } catch (error) {

    }

    setIsLoading(false);
  }

  const getPlanesCliente = async () => {
    setIsLoading(true);
    try {
        const res = await PlanAlimentacionRequests.planesCliente(cliente);
        setPlanesAlimentacion(res.data);
    } catch (error) {

    }

    setIsLoading(false);
  }

  const getClientes = async () => {
    try {
        const res = await UserRequests.clientes();
        setClientes(res.data);
    } catch (error) {
    }
  }

  useEffect(() => {
      if(listaSeleccionada === "TODAS"){
        getPlanes();
      } else if (listaSeleccionada === "CLIENTES") {
          setCliente('');
          setPlanesAlimentacion([]);
      }
  },[listaSeleccionada])

  useEffect(() => {
    if(listaSeleccionada === "CLIENTES") getPlanesCliente();
  },[cliente]);

  useEffect(() => {
    getClientes()
  },[]);

  return (
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
             <RouterLink to="/agregar-plan-alimentacion" className="float-right">
                <Button>
                    Agregar Plan de Alimentacion
                </Button>
            </RouterLink>
            <Nav tabs>
                <NavItem>
                    <NavLink active={listaSeleccionada === 'TODAS' ? true : false} onClick={() => setListaSeleccionada('TODAS')} href="#">Todos los planes de alimentacion</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={listaSeleccionada === 'CLIENTES' ? true : false} onClick={() => setListaSeleccionada('CLIENTES')} href="#">Plan por Cliente</NavLink>
                </NavItem>
            </Nav>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            {isLoading ?  <Spinner /> : <React.Fragment/>}
            {listaSeleccionada === "CLIENTES" ?
                <FormSelect className="col-6 ml-3 mt-3" onChange={(e) => setCliente(e.target.value)}>
                    <option value="" selected disabled hidden>Seleccionar Cliente...</option>
                    {clientes.map(cliente => <option value={cliente.id}>{cliente.nombre}</option>)}
                </FormSelect>
                :
                <React.Fragment />
            }
            <table className="table mb-0">
            <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Nombre
                  </th>
                  <th scope="col" className="border-0">
                    Profesor
                  </th>
                </tr>
              </thead>
              <tbody>
                {planesAlimentacion.map((plan, index) => (<PlanAlimentacionItem planAlimentacion={plan} numero={index + 1} key={index}/>))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ListaPlanes;
