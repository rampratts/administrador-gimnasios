import React, { useState, useContext } from "react";

import {
  Card,
  Button,
  Row,
  Col,
  FormInput,
  Alert,
  Form, FormTextarea, Modal, ModalHeader, ModalBody
} from "shards-react";
import { useForm } from 'react-hook-form';
import Spinner from '../utils/Spinner';
import ProgresosRequests from '../../api/ProgresosRequests';

const AgregarProgresoForm = ({isOpen, toggle, cliente}) => {
    const [isLoading, setIsloading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = async data => {
        setIsloading(true);
        try {
            const progreso = { ...data, cliente_id: cliente }
            await ProgresosRequests.agregarProgreso(progreso);
            setSuccess(true);
            toggle(true);
        } catch (error) {
            setSuccess(false);
            toggle(false);
        }

        setIsloading(false);
    }

    return (
        <Modal open={isOpen} toggle={toggle}>
            <ModalHeader>Agregar Nuevo Progreso para Cliente</ModalHeader>
            <ModalBody>                
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
                                        placeholder="Descripción del progreso"
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
            </ModalBody>
        </Modal>
    )
}

export default AgregarProgresoForm;