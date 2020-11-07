import instance from './axios.instance';

class RutinasRequests {
    static async progresosCliente(cliente, isUserId = false) {
        return await instance.get(`progresos/${cliente}?userId=${isUserId}`);
    }

    static async agregarProgreso(progreso) {
        return await instance.post('progresos/', progreso);
    }
}

export default RutinasRequests;
