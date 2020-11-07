import React, { useState, useEffect } from 'react';
import {  Row, Col, Card, CardHeader, CardBody} from "shards-react";
import Spinner from '../utils/Spinner';
import SugerenciaItem from './SugerenciaItem';
import SugerenciasRequests from '../../api/SugerenciasRequests';

function ListaProgresos() {
    const [isLoading, setIsLoading] = useState(false);
    const [sugerencias, setSugerencias] = useState([]);

    const getSugerencias = async () => {
        setIsLoading(true);
        try {
            const res = await SugerenciasRequests.sugerencias();
            setSugerencias(res.data);
        } catch (error) {
            
        }

        setIsLoading(false);
    }

    useEffect(() => {
        getSugerencias();
    }, [])

    return (
        <Row>
            <Col>
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h3>Lista de sugerencias</h3>
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
                        Enviada Por
                        </th>
                        <th scope="col" className="border-0">
                        Fecha
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {sugerencias.map((sugerencia, index) => (<SugerenciaItem sugerencia={sugerencia} numero={index + 1} key={index}/>))}
                    </tbody>
                </table>
                </CardBody>
            </Card>
            </Col>
        </Row>
    )
}

export default ListaProgresos;
