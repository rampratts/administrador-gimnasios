import request from "./axios.instance";

class UserRequests {
    static async login(nombre_usuario, contrasena) {
        return await request.post('users/login', { nombre_usuario, contrasena });
    }

    static async verifyToken() {
        return await request.post('users/verifyToken');
    }
}

export default UserRequests;