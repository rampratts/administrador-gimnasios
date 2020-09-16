import instance from './axios.instance';

class ClasesRequests {
    static async getClases() {
        return await instance.get('clases/');
    }

    static async registrarClase(clase) {
        return await instance.post('clases/', clase);
    }

    static async registrarUsuarioEnClase(claseId) {
        return instance.post('clases/registrar-usuario', {claseId});
    }

    static async clasesDeUsuario(idUsuario) {
        return await instance.get(`clases/clase-usuario${idUsuario ? '?id='+idUsuario : ''}`);
    }
}

export default ClasesRequests;