import instance from './axios.instance';

//Esta clase ahora mismo cuenta con valores hardcodeados. La idea es cambiarlos por llamadas al backend cuando esten listas las rutas
class ClasesRequests {
    static async getClases() {
        return await instance.get('clases/');
    }

    static registrarUsuarioEnClase() {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve('Registrado')
            }, 500);
        })
    }

    static async clasesDeUsuario(idUsuario) {
        return await instance.get(`clases/clase-usuario${idUsuario ? '?id='+idUsuario : ''}`);
    }
}

export default ClasesRequests;