import React, { useState } from "react";

import {
  Card,
  Button,
  Row,
  Col,
  FormInput,
  Alert,
  Form, FormTextarea
} from "shards-react";
import { useForm } from 'react-hook-form';
import Spinner from '../utils/Spinner';

const AgregarProgresoForm = () => {
    const [isLoading, setIsloading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = async data => {
        setIsloading(true);
        try {
            // await ClasesRequests.registrarClase(data);
            console.log(data);
            setSuccess(true);
        } catch (error) {
            setError(true);
            setErrorMessage('Ha ocurrido un error. Por favor vuelve a intentarlo en unos minutos.');
        }
        
        setAlertOpen(true);
        setIsloading(false);
    }

    return (
        <React.Fragment>
            <Alert theme={success ? 'success' : 'danger'} dismissible={() => setAlertOpen(false)} open={alertOpen}>
            {success ?
                <span>La clase fue creada correctamente.</span>
                :
                <span>{errorMessage}</span>
            }
            </Alert>
            <Card small className="mb-4 pt-3">
                {isLoading ?  <Spinner /> : <React.Fragment/>}
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                             {/* Nombre de clase */}
                            <Col md="6" className="form-group">
                                <label htmlFor="fecha">Fecha</label>
                                <FormInput
                                    id="fecha"
                                    type="date"
                                    name="fecha"
                                    innerRef={register({required: 'Indique una fecha' })}
                                    invalid={errors.fecha}
                                />
                                {errors.fecha && <div class="invalid-feedback">{errors.fecha.message}</div>}
                            </Col>

                            {/* Descripcion de clase */}
                            <Col className="form-group">
                                <label htmlFor="descripcion-clase">Descripción</label>
                                <FormTextarea
                                    id="descripcion-progreso"
                                    placeholder="Descripción de la Clase"
                                    type="text"
                                    name="descripcion"
                                    innerRef={register({required: 'Indique un descripción para el progreso' })}
                                    invalid={errors.descripcion}
                                />
                                {errors.descripcion && <div class="invalid-feedback">{errors.descripcion.message}</div>}
                            </Col>

                            <Button className="float-right mb-3 mr-3" type="submit">Agregar Progreso</Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
    )
}

export default AgregarProgresoForm;