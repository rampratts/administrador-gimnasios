import React, { useContext, useState } from 'react';
import { Button } from "shards-react";
import PagosRequests from '../../api/PagosRequests';
import { UserContext } from '../../context/UserContext';

const PagoItem = ({pago, getPagos,numero}) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Marcar Pago');
  const [buttonTheme, setButtonTheme] = useState('primary');
  const [success, setSuccess] = useState(false);
  const date = new Date(pago.fecha_pago);

  const marcarPago = async () => {
    setIsLoading(true);
    try {
      await PagosRequests.marcarPago(pago.id);
      setButtonText('Pagado con exito.');
      setButtonTheme('success');
      setSuccess(true);

    } catch (error) {
      setButtonText('Error. Volver a intentar');
      setButtonTheme('danger');
      setSuccess(false);
    }
    setIsLoading(false)
    getPagos();
  }

  return (
        <tr>
          <td>{numero}</td>
          <td>${pago.cantidad}</td>
          <td>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getFullYear()}</td>
          <td>{pago.estado_pago ? <span className="text-success">Pagado</span> : <span className="text-danger">No pagado</span>}</td>
          <td>{(pago.estado_pago || userInfo.tipo_usuario !== 'admin') ? <React.Fragment/>: <Button onClick={marcarPago} disabled={isLoading || success} theme={buttonTheme}>{buttonText}</Button>}</td>
        </tr>
  );
}

export default PagoItem;
