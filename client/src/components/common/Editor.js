import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import { Col, Row, Card, CardBody, Form, FormInput, Button } from "shards-react";
import { useForm } from 'react-hook-form';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import RutinasRequests from "../../api/RutinasRequests";
import Spinner from "../utils/Spinner";

const Editor = () => {
    const [titulo, setTitulo] = useState('');
    const [text, setTexto] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, errors} = useForm(    {
        defaultValues: {
            duracion: "00:00" 
      }
    });

    const guardarRutina = async (data) => {
        setIsLoading(true);
        try {
            await RutinasRequests.crearRutina({...data, descripcion: text});
        } catch (error) {

        }
        setIsLoading(false);
    }

    return (
        <Card small className="mb-3">
            <CardBody>
                {isLoading ? <Spinner /> : <React.Fragment />}
                <Form className="add-new-post" onSubmit={handleSubmit(guardarRutina)}>
                    <FormInput 
                        size="lg"
                        className="mb-3" 
                        placeholder="Nombre de la Rutina" 
                        name="nombre"
                        innerRef={register({required: 'Indique un nombre para la rutina' })}
                        invalid={errors.nombre}/>
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                    
                    <Row>

                        <Col md="5" className="form-group">
                            <label htmlFor="frecuencia">Frecuencia Semanal</label>
                            <FormInput
                                id="frecuencia"
                                placeholder="0"
                                type="number"
                                name="frecuencia"
                                innerRef={register({required: 'Indique una frecuencia' })}
                                invalid={errors.frecuencia}
                            />
                            {errors.frecuencia && <div class="invalid-feedback">{errors.frecuencia.message}</div>}
                        </Col>

                        <Col md="5" className="form-group">
                            <label htmlFor="duracion">Duración</label>
                            <FormInput
                                id="duracion"
                                placeholder=""
                                type="time"
                                name="duracion"
                                innerRef={register({required: 'Indique la duracion' })}
                                invalid={errors.duracion}
                            />
                            {errors.duracion && <div class="invalid-feedback">{errors.duracion.message}</div>}
                        </Col>

                    </Row>


                    <ReactQuill 
                        className="add-new-post__editor mb-1" 
                        value={text}
                        onChange={setTexto}
                        />

                    <Button className="float-right"  type="submit">Agregar Rutina</Button>
                </Form>
            </CardBody>
        </Card>
    )
};

export default Editor;
