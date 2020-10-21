import instance from './axios.instance';

class PlanAlimentacionRequests {
    static async crearPlan(planAlimentacion) {
        return await instance.post('planAlimentacion/', planAlimentacion);
    }

    static async obtenerTodosLosPlanes() {
        return await instance.get('planAlimentacion/');
    }

    static async planesCliente(cliente, isUserId = false) {
        return await instance.get(`planAlimentacion/cliente/${cliente}?userId=${isUserId}`)
    }

    static async plan(planAlimentacion) {
        return await instance.get(`planAlimentacion/${planAlimentacion}`)
    }

    static async asignarPlan(payload) {
        return await instance.post(`planAlimentacion/asignar-cliente`, payload);
    }
}

export default PlanAlimentacionRequests;
