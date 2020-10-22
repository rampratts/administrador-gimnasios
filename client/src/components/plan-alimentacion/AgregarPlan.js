import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Col, Row, Card, CardBody, Form, FormInput, Button, Alert } from "shards-react";
import { useForm } from 'react-hook-form';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import RutinasRequests from "../../api/RutinasRequests";
import Spinner from "../utils/Spinner";
import PlanAlimentacionRequests from "../../api/PlanAlimentacionRequests";

const AgregarPlan = () => {
    const [text, setTexto] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const { register, handleSubmit, errors} = useForm();

    const guardarPlan = async (data) => {
        setIsLoading(true);
        try {
            await PlanAlimentacionRequests.crearPlan({...data, descripcion: text});
            setSuccess(true);
            setAlertMessage('Plan creado con éxito');
            setAlertOpen(true);
        } catch (error) {
            setSuccess(false);
            setAlertMessage('Error al crear plan.');
            setAlertOpen(true);
        }
        setIsLoading(false);
    }

    return (
        <Card small className="mb-3">
            <Alert theme={success ? 'success' : 'danger'} dismissible={() => setAlertOpen(false)} open={alertOpen}>
                {alertMessage}
            </Alert>
            <CardBody>
                {isLoading ? <Spinner /> : <React.Fragment />}
                <Form className="add-new-post" onSubmit={handleSubmit(guardarPlan)}>
                    <FormInput
                        size="lg"
                        className="mb-3"
                        placeholder="Nombre del Plan"
                        name="nombre"
                        innerRef={register({required: 'Indique un nombre para el plan' })}
                        invalid={errors.nombre}/>
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}

                    <ReactQuill
                        className="add-new-post__editor mb-1"
                        value={text}
                        onChange={setTexto}
                        />

                    <Button className="float-right"  type="submit">Agregar Plan</Button>
                </Form>
            </CardBody>
        </Card>
    )
};

export default AgregarPlan;
