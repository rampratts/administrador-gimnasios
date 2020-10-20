/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, {useState, useEffect} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  FormSelect,
  Alert,
} from "shards-react";
import PlanAlimentacionRequests from "../../api/PlanAlimentacionRequests";
import UserRequests from "../../api/UserRequests";
import Spinner from "../utils/Spinner";

const AsignarPlanAlimnetacion = () => {
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');
    const [planAlimentacionId, setPlanAlimentacionId] = useState('');
    const [clientes, setClientes] = useState([]);
    const [success, setSuccess] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getClientes = async () => {
        try {
            const res = await UserRequests.clientes();
            setClientes(res.data);
        } catch (error) {
        }
    }

    const guardarCliente = async () => {
        setIsLoading(true);
        if(clienteSeleccionado) {
            try {
                const payload = {clienteId: clienteSeleccionado, planAlimentacionId: planAlimentacionId};
                const res = await PlanAlimentacionRequests.asignarPlan(payload);
                if(res.data.status === 'FAIL') {
                    setSuccess(false);
                    setAlertMessage('El cliente ya fue asignado a este plan.');
                    setAlertOpen(true);
                } else {
                    setSuccess(true);
                    setAlertMessage('Plan asignado.');
                    setAlertOpen(true);
                }

            } catch (error) {
                setSuccess(false);
                setAlertMessage('Hubo un error al asignar el plan.');
                setAlertOpen(true);
            }
        } else {
            setSuccess(false);
            setAlertMessage('Por favor indique un cliente.');
            setAlertOpen(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getClientes()
        setPlanAlimentacionId(new URLSearchParams(window.location.search).get('id'));
    },[]);

    return (
        <Card small className="mb-3">
            <CardHeader className="border-bottom">
            <h6 className="m-0">Asignar Plan</h6>
            </CardHeader>

            <CardBody className="p-0">
                {isLoading ? <Spinner /> : <React.Fragment />}
            <ListGroup flush>
                <ListGroupItem className="p-3">
                    <p>Seleccione un usuario para asignar:</p>
                    <FormSelect onChange={(e) => setClienteSeleccionado(e.target.value)}>
                        <option value="" selected disabled hidden>Seleccionar Cliente...</option>
                        {clientes.map(cliente => <option value={cliente.id}>{cliente.nombre}</option>)}
                    </FormSelect>
                </ListGroupItem>
                <ListGroupItem className="d-flex px-3 border-0">
                <Button theme="accent" size="sm" className="ml-auto" onClick={guardarCliente}>
                    <i className="material-icons">file_copy</i> Guardar
                </Button>
                </ListGroupItem>
                <Alert theme={success ? 'success' : 'danger'} dismissible={() => setAlertOpen(false)} open={alertOpen}>
                    {alertMessage}
                </Alert>
            </ListGroup>
            </CardBody>
        </Card>
    );
}

export default AsignarPlanAlimnetacion;
