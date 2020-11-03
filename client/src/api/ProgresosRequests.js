import instance from './axios.instance';

class RutinasRequests {
    static async progresosCliente(cliente) {
        // return instance.get()
        return await instance.get(`progresos/${cliente}`);
    }

    static async agregarProgreso(progreso) {
        return await instance.post('progresos/', progreso);
    }
}

export default RutinasRequests;
