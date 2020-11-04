import instance from './axios.instance';

class SugerenciasRequests {
    static async sugerencias() {
        // return await instance.get('clases/');

        return new Promise(resolve => {
            setInterval(() => resolve([{
                id: 1,
                descripcion: "bla bla bla",
                fecha: "12/12/12",
                usuario_id: "Pepito"
            },{
                id: 2,
                descripcion: "bla bla bla",
                fecha: "12/12/12",
                usuario_id: "Pepito"
            },{
                id: 3,
                descripcion: "bla bla bla",
                fecha: "12/12/12",
                usuario_id: "Pepito"
            },{
                id: 4,
                descripcion: "bla bla bla",
                fecha: "12/12/12",
                usuario_id: "Pepito"
            }]), 2000);
        })
    }

    static async sugerencia(sugerenciaId) {
        // return await instance.get('clases/');

        return new Promise(resolve => {
            setInterval(() => resolve([{
                id: 1,
                descripcion: "bla bla bla",
                fecha: "12/12/12",
                usuario_id: "Pepito"
            }]), 2000);
        })
    }
}

export default SugerenciasRequests;