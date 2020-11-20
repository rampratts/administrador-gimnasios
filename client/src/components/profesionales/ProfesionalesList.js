import React, { useState, useEffect } from 'react';
import {  Row, Col, Card, CardHeader, CardBody } from "shards-react";
import Spinner from '../utils/Spinner';
import ProfesionalItem from './ProfesionalItem';
import UserRequests from '../../api/UserRequests';

function ListaProgresos() {
    const [isLoading, setIsLoading] = useState(false);
    const [profesionales, setProfesionales] = useState([]);

    const getProfesionales = async () => {
      setIsLoading(true);
      try {
        const res = await UserRequests.profesores();
        setProfesionales(res.data);
      } catch (error) {

      }
      setIsLoading(false);
    }

    useEffect(() => {
      getProfesionales();
    }, [])

    return (
        <Row>
            <Col>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <p>Lista con todos los profesionales disponibles en el gimnasio.</p>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                {isLoading ?  <Spinner /> : <React.Fragment/>}
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
                        Área
                        </th>
                        <th scope="col" className="border-0">
                        Calificado
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {profesionales.map((profesional, index) => (<ProfesionalItem profesional={profesional} numero={index + 1} key={index}/>))}
                    </tbody>
                </table>
                </CardBody>
            </Card>
            </Col>
        </Row>
    )
}

export default ListaProgresos;
