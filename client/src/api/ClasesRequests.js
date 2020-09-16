import instance from './axios.instance';

class ClasesRequests {
    static async getClases() {
        return await instance.get('clases/');
    }

    static async registrarUsuarioEnClase(claseId) {
        return instance.post('clases/registrar-usuario', {claseId});
    }

    static async clasesDeUsuario(idUsuario) {
        return await instance.get(`clases/clase-usuario${idUsuario ? '?id='+idUsuario : ''}`);
    }
}

export default ClasesRequests;