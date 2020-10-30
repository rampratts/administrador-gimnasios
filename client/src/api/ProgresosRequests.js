import instance from './axios.instance';

class RutinasRequests {
    static async progresosCliente() {
        // return instance.get()
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        "descripcion": "Esto es una descripcion de prueba",
                        "fecha":  '12/12/12',
                        "profesor": "Ramiro"
                    },
                    {
                        "descripcion": "Esto es una descripcion de prueba con una descripcion mucho mas larga con cosas locaaaaaaaaas locaaaaaaaaas locaaaaaaaaaslocaaaaaaaaas locaaaaaaaaas",
                        "fecha":  '12/12/12',
                        "profesor": "Ramiro"
                    }
                ])
            }, 2000)
        })
    }
}

export default RutinasRequests;
