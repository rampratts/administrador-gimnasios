import instance from './axios.instance';

class PagosRequests {
    static async crearPago(pago) {
        return await instance.post('pagos/', pago);
    }

    static async obtenerPagos(id) {
        return await instance.get(`pagos/${id}`);
    }

    static async misPagos() {
      return await instance.get('pagos/mis-pagos');
    }

    static async marcarPago(pago_id) {
        return await instance.patch('pagos/marcar-pago', {pago_id});
    }
}

export default PagosRequests;
