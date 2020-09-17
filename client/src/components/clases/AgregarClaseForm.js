import React, { useEffect, useState } from "react";

import {
  Card,
  Button,
  Row,
  Col,
  FormInput,
  Alert,
  Form, FormTextarea, FormCheckbox, FormSelect
} from "shards-react";
import { useForm } from 'react-hook-form';
import Spinner from '../utils/Spinner';
import UserRequests from "../../api/UserRequests";
import ClasesRequests from "../../api/ClasesRequests";

const AgregarClaseForm = () => {
    const [isLoading, setIsloading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [diasDeClase, setDiasDeClase] = useState({lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false});
    const [errorMessage, setErrorMessage] = useState('');
    const [profesores, setProfesores] = useState([]);
    const { register, handleSubmit, errors} = useForm();

    const getProfesores = async () => {
        setIsloading(true);
        try {
            const res = await UserRequests.profesores();
            if(!res.data.error){
                setProfesores(res.data);
            }
        } catch (error) {
            setError(true);
            setErrorMessage('Ha ocurrido un error. Por favor vuelve a intentarlo en unos minutos.');
        }

        setIsloading(false);
    }

    useEffect(() => {
        getProfesores();
    },[])

    const onSubmit = async data => {
        setIsloading(true);
        try {
            await ClasesRequests.registrarClase(data);
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
                                <label htmlFor="nombre-clase">Nombre de la Clase</label>
                                <FormInput
                                    id="nombre-clase"
                                    placeholder="Nombre de la Clase"
                                    type="text"
                                    name="nombre"
                                    innerRef={register({required: 'Indique un nombre para la nueva clase' })}
                                    invalid={errors.nombre}
                                />
                                {errors.nombre && <div class="invalid-feedback">{errors.nombre.message}</div>}
                            </Col>

                            {/* Descripcion de clase */}
                            <Col md="6" className="form-group">
                                <label htmlFor="descripcion-clase">Descripcion de la Clase</label>
                                <FormTextarea
                                    id="descripcion-clase"
                                    placeholder="Descripcion de la Clase"
                                    type="text"
                                    name="descripcion"
                                    innerRef={register({required: 'Indique un descripcion para la nueva clase' })}
                                    invalid={errors.descripcion}
                                />
                                {errors.descripcion && <div class="invalid-feedback">{errors.descripcion.message}</div>}
                            </Col>

                            {/* Horario de clase */}
                            <Col md="4" className="form-group">
                                <label htmlFor="horario-clase">Horario de la Clase</label>
                                <FormInput
                                    id="horario-clase"
                                    placeholder="Horario de la Clase"
                                    type="time"
                                    name="horario"
                                    innerRef={register({required: 'Indique un horario para la nueva clase' })}
                                    invalid={errors.horario}
                                />
                                {errors.horario && <div class="invalid-feedback">{errors.horario.message}</div>}
                            </Col>

                            {/* Dias de clase */}
                            <Col md="12" className="form-group">
                                <p htmlFor="dias-clase">Dias de la Clase</p>
                                <FormCheckbox
                                    inline
                                    id="dias-clase"
                                    type="time"
                                    name="lunes"
                                    innerRef={register}
                                    invalid={errors.dias_clase}
                                    checked={diasDeClase.lunes}
                                    onChange={e => setDiasDeClase({ ...diasDeClase, lunes: !diasDeClase.lunes })}
                                > 
                                Lunes
                                </FormCheckbox>
                                <FormCheckbox
                                    inline
                                    id="dias-clase"
                                    type="time"
                                    name="martes"
                                    innerRef={register}
                                    invalid={errors.dias_clase}
                                    checked={diasDeClase.martes}
                                    onChange={e => setDiasDeClase({ ...diasDeClase, martes: !diasDeClase.martes })}
                                > 
                                Martes
                                </FormCheckbox>
                                <FormCheckbox
                                    inline
                                    id="dias-clase"
                                    type="time"
                                    name="miercoles"
                                    innerRef={register}
                                    invalid={errors.dias_clase}
                                    checked={diasDeClase.Miércoles}
                                    onChange={e => setDiasDeClase({ ...diasDeClase, miercoles: !diasDeClase.miercoles })}
                                > 
                                Miércoles
                                </FormCheckbox>
                                <FormCheckbox
                                    inline
                                    id="dias-clase"
                                    type="time"
                                    name="jueves"
                                    innerRef={register}
                                    invalid={errors.dias_clase}
                                    checked={diasDeClase.jueves}
                                    onChange={e => setDiasDeClase({ ...diasDeClase, jueves: !diasDeClase.jueves })}
                                > 
                                Jueves
                                </FormCheckbox>
                                <FormCheckbox
                                    inline
                                    id="dias-clase"
                                    type="time"
                                    name="viernes"
                                    innerRef={register}
                                    invalid={errors.dias_clase}
                                    checked={diasDeClase.viernes}
                                    onChange={e => setDiasDeClase({ ...diasDeClase, viernes: !diasDeClase.viernes })}
                                > 
                                Viernes
                                </FormCheckbox>
                                <FormCheckbox
                                    inline
                                    id="dias-clase"
                                    type="time"
                                    name="sabado"
                                    innerRef={register}
                                    invalid={errors.dias_clase}
                                    checked={diasDeClase.sabado}
                                    onChange={e => setDiasDeClase({ ...diasDeClase, sabado: !diasDeClase.sabado })}
                                > 
                                Sábado
                                </FormCheckbox>
                                <FormCheckbox
                                    inline
                                    id="dias-clase"
                                    type="time"
                                    name="domingo"
                                    innerRef={register}
                                    invalid={errors.domingo}
                                    checked={diasDeClase.domingo}
                                    onChange={e => setDiasDeClase({ ...diasDeClase, domingo: !diasDeClase.domingo })}
                                > 
                                Domingo
                                </FormCheckbox>
                            </Col>

                            <Col md="4" className="form-group">
                              <label htmlFor="profesor">Profesor</label>
                              <FormSelect id="profesor" name="profesor" innerRef={register({required: 'Seleccione un profesor'})} invalid={errors.profesor}>
                                  <option value="" selected disabled hidden>Seleccionar...</option>
                                  {profesores.map(profesor => (
                                      <option value={profesor.id}>{profesor.nombre} {profesor.apellido}</option>
                                  ))}
                              </FormSelect>
                              {errors.profesor && <div class="invalid-feedback">{errors.profesor.message}</div>}
                            </Col>

                            <Button className="float-right mb-3 mr-3" type="submit">Agregar Clase</Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
    )
}

export default AgregarClaseForm;