import instance from './axios.instance';

class PagosRequests {
    static async crearPago(pago) {
        return await instance.post('pagos/', pago);
    }
}

export default PagosRequests;
