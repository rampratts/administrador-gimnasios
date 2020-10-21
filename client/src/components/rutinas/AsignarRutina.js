/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, {useState, useEffect, useContext} from "react";
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
import RutinasRequests from "../../api/RutinasRequests";
import UserRequests from "../../api/UserRequests";
import { UserContext } from "../../context/UserContext";
import Spinner from "../utils/Spinner";

const SidebarActions = () => {
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');
    const [rutinaId, setRutinaId] = useState('');
    const [clientes, setClientes] = useState([]);
    const [success, setSuccess] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo] = useContext(UserContext);
    
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
                const payload = {clienteId: clienteSeleccionado, rutinaId: rutinaId};
                const res = await RutinasRequests.asignarRutina(payload);
                if(res.data.status === 'FAIL') {
                    setSuccess(false);
                    setAlertMessage('El cliente ya fue asignado a esta rutina.');
                    setAlertOpen(true);
                } else {
                    setSuccess(true);
                    setAlertMessage('Rutina asignada.');
                    setAlertOpen(true);
                }

            } catch (error) {
                setSuccess(false);
                setAlertMessage('Hubo un error al asignar la Rutina.');
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
        setRutinaId(new URLSearchParams(window.location.search).get('id'));
    },[]);

    if(userInfo.tipo_usuario === 'cliente') return (<React.Fragment />);

    return (
        <Card small className="mb-3">
            <CardHeader className="border-bottom">
            <h6 className="m-0">Asignar Rutina</h6>
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

export default SidebarActions;
