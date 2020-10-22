import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Col, Row, Card, CardBody } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import RutinasRequests from "../../api/RutinasRequests";
import Spinner from "../utils/Spinner";
import PlanAlimentacionRequests from "../../api/PlanAlimentacionRequests";

const PlanAlimentacionDetalle = () => {
    const [planAlimentacion, setPlanAlimentacion] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const cargarPlan = async () => {
        setIsLoading(true);
        try {
            const rutinaId = new URLSearchParams(window.location.search).get('id');
            const res = await PlanAlimentacionRequests.plan(rutinaId);
            setPlanAlimentacion(res.data[0])
        } catch (error) {

        }
        setIsLoading(false);
    }

    useEffect(() => {
      cargarPlan();
    }, [])


    return (
        <Card small className="mb-3">
            <CardBody>
                {
                    isLoading ?
                    <Spinner />
                    :
                    <React.Fragment>
                        <h3 className="mb-3">{planAlimentacion.nombre}</h3>

                        <ReactQuill
                            className="add-new-post__editor mb-1"
                            value={planAlimentacion.descripcion}
                            readOnly/>
                    </React.Fragment>

                }

            </CardBody>
        </Card>
    )
};

export default PlanAlimentacionDetalle;
