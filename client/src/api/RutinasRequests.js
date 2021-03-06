import instance from './axios.instance';

class RutinasRequests {
    static async crearRutina(rutina) {
        return await instance.post('rutinas/', rutina);
    }

    static async obtenerTodasRutinas() {
        return await instance.get('rutinas/');
    }

    static async rutinasCliente(cliente, isUserId = false) {
        return await instance.get(`rutinas/cliente/${cliente}?userId=${isUserId}`)
    }

    static async rutina(rutina) {
        return await instance.get(`rutinas/${rutina}`)
    }

    static async asignarRutina(payload) {
        return await instance.post(`rutinas/asignar-cliente`, payload);
    }
}

export default RutinasRequests;
