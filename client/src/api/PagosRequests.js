import instance from './axios.instance';

class PagosRequests {
    static async crearPago(pago) {
        return await instance.post('pagos/', pago);
    }

    static async obtenerPagos() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({data: [{
                    estado_pago: false,
                    fecha_pago: '10-12-2020',
                    cantidad: 29.99,
                },
                {
                    estado_pago: true,
                    fecha_pago: '10-11-2020',
                    cantidad: 29.99,
                }]})
            }, 500)
        });
    }

    static async misPagos() {
      return await instance.get('pagos/mis-pagos');
    }

    static async marcarPago() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
             }, 1000);
        })
    }
}

export default PagosRequests;
