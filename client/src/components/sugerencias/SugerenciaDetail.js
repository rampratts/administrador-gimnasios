import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Col, Row, Card, CardBody } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import Spinner from "../utils/Spinner";
import SugerenciasRequests from "../../api/SugerenciasRequests";

const SugerenciaDetail = () => {
    const [sugerencia, setSugerencia] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const date = new Date(sugerencia.fecha);

    const cargarSugerencia = async () => {
        setIsLoading(true);
        try {
            const sugerenciaId = new URLSearchParams(window.location.search).get('id');
            const res = await SugerenciasRequests.sugerencia(sugerenciaId);
            setSugerencia(res.data)
        } catch (error) {

        }
        setIsLoading(false);
    }

    useEffect(() => {
        cargarSugerencia();
    }, [])


    return (
        <Card small className="mb-3">
            <CardBody>
                {
                    isLoading ?
                    <Spinner />
                    :
                    <React.Fragment>
                        <h5 className="mb-3">Enviado por: {sugerencia.nombre} {sugerencia.apellido}</h5>
                        <h5 className="mb-3">Fecha: {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getFullYear()}</h5>

                        <ReactQuill
                            className="add-new-post__editor mb-1"
                            value={sugerencia.descripcion}
                            readOnly/>
                    </React.Fragment>

                }

            </CardBody>
        </Card>
    )
};

export default SugerenciaDetail;
