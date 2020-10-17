import instance from './axios.instance';

class RutinasRequests {
    static async crearRutina(rutina) {
        return await instance.post('rutinas/', rutina);
    }

    static async obtenerTodasRutinas() {
        return await instance.get('rutinas/');
    }

    static async rutinasCliente(cliente) {
        return await instance.get(`rutinas/cliente/${cliente}`)
    }
}

export default RutinasRequests;
