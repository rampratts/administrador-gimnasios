import instance from './axios.instance';

//Esta clase ahora mismo cuenta con valores hardcodeados. La idea es cambiarlos por llamadas al backend cuando esten listas las rutas
class ClasesRequests {
    static getClases() {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve([
                    {
                        id: 1,
                        nombre: "Musculatura",
                        descripcion: "Esta es una clase de musculatura",
                        horario: "10:30",
                        lunes: true,
                        martes: false,
                        miercoles: true,
                        jueves: false,
                        viernes: true,
                        sabado: false,
                        domingo: false,
                        profesor: "Juan Carlos"
                    },
                    {
                        id: 2,
                        nombre: "Zumba",
                        descripcion: "Esta es una clase de zumba",
                        horario: "20:30",
                        lunes: false,
                        martes: false,
                        miercoles: true,
                        jueves: false,
                        viernes: true,
                        sabado: false,
                        domingo: false,
                        profesor: "Maria Pedrozo"
                    },
                    {   id: 3,
                        nombre: "Crossfit",
                        descripcion: "Esta es una clase de crossfit",
                        horario: "16:30",
                        lunes: false,
                        martes: true,
                        miercoles: false,
                        jueves: false,
                        viernes: true,
                        sabado: true,
                        domingo: false,
                        profesor: "Un profesor"
                    }
                ])
            }, 500)
        })
    }

    static registrarUsuarioEnClase() {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve('Registrado')
            }, 500);
        })
    }

    static clasesDeUsuario() {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve([2, 3])
            }, 500);
        })
    }
}

export default ClasesRequests;