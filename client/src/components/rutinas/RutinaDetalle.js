import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Col, Row, Card, CardBody } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import RutinasRequests from "../../api/RutinasRequests";
import Spinner from "../utils/Spinner";

const RutinaDetalle = () => {
    const [rutina, setRutina] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const cargarRutina = async () => {
        setIsLoading(true);
        try {
            const rutinaId = new URLSearchParams(window.location.search).get('id');
            const res = await RutinasRequests.rutina(rutinaId);
            setRutina(res.data[0])
        } catch (error) {

        }
        setIsLoading(false);
    }

    useEffect(() => {
        cargarRutina();
    }, [])


    return (
        <Card small className="mb-3">
            <CardBody>
                {
                    isLoading ?
                    <Spinner />
                    :   
                    <React.Fragment>
                        <h3 className="mb-3">{rutina.nombre}</h3>

                        <Row>
                            <Col md="5" className="form-group">
                                <p className="mb-3">Frecuencia Semanal: {rutina.frecuencia} veces</p>
                            </Col>

                            <Col md="5" className="form-group">
                                <p className="mb-3">Duración: {rutina.duracion}</p>
                            </Col>
                        </Row>

                        <ReactQuill 
                            className="add-new-post__editor mb-1" 
                            value={rutina.descripcion}
                            readOnly/>
                    </React.Fragment>

                }
                
            </CardBody>
        </Card>
    )
};

export default RutinaDetalle;
