import instance from './axios.instance';

class RutinasRequests {
    static async crearRutina(pago) {
        return await instance.post('rutina/', pago);
    }

    static async obtenerTodasRutinas() {
        return new Promise(resolve => {
            setTimeout(() => resolve([
                {
                    nombre: "Pecho",
                    duracion: "00:30",
                    frecuencia: "3",
                    profesor: "Ramiro"
                },
                {
                    nombre: "Piernas",
                    duracion: "00:45",
                    frecuencia: "2",
                    profesor: "Jose"
                },
            ]),2000)
        })
    }

    static async rutinasCliente() {
        return new Promise(resolve => {
            setTimeout(() => resolve([
                {
                    nombre: "Pecho",
                    duracion: "00:30",
                    frecuencia: "3",
                    profesor: "Ramiro"
                }
            ]),2000)
        })
    }
}

export default RutinasRequests;
