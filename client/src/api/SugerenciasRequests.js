import instance from './axios.instance';

class SugerenciasRequests {
    static async sugerencias() {
        return await instance.get('sugerencias/');
    }

    static async sugerencia(sugerenciaId) {
        return await instance.get(`sugerencias/${sugerenciaId}`);
    }

    static async crearSugerencia(sugerencia) {
        return await instance.post('sugerencias/', sugerencia);
    }
}

export default SugerenciasRequests;