import request from "./axios.instance";

class UserRequests {
    static async login(nombre_usuario, contrasena) {
        return await request.post('users/login', { nombre_usuario, contrasena });
    }

    static async verifyToken() {
        return await request.post('users/verifyToken');
    }

    static async registerUser(user) {
        return await request.post('users/register', user);
    }

    static async comprobarNombreUsuario(nombre_usuario) {
        return await request.post('users/comprobar-nombre-disponible', {nombre_usuario});
    }

    static async eliminarUsuario() {
        return await request.delete('users/');
    }

    static async profesores() {
        return await request.get('users/profesores');
    }

    static async clientes() {
        return await request.get('users/clientes');
    }
}

export default UserRequests;