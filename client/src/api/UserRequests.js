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
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve([{
                    id: 1,
                    nombre: "Juan",
                    apellido: "Perez"
                },
                {
                    id: 2,
                    nombre: "Ramiro",
                    apellido: "Meneses"
                }
            ])
            }, 500);
        })
    }
}

export default UserRequests;