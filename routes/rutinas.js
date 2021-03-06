const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');

router.post('/', Auth.isAuth, Auth.isProf, async(req,res)=>{
    const { nombre, descripcion, frecuencia, duracion} = req.body;
    const { id } = (await pool.query('SELECT id FROM profesor WHERE usuario_id = $1', [req.user.id])).rows[0];

    try {
        const rutinaid = uuidv4();

        await pool.query("INSERT INTO rutina VALUES($1, $2, $3, $4, $5, $6)", [rutinaid, nombre,descripcion,frecuencia,duracion,id]);            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Rutina registrada"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/asignar-cliente', Auth.isAuth, Auth.isProf, async (req, res) => {
    const { rutinaId, clienteId }  = req.body;
    
    try{
        const { count } = (await pool.query('SELECT count(*) FROM rutina_cliente WHERE rutina_id = $1 AND cliente_id = $2',[rutinaId, clienteId])).rows[0];
        if(count > 0 ) {
            res.send({
                status: "FAIL",
                statusCode: 200,
                results: "Cliente ya asignado"
            })   
        } else {
            await pool.query('INSERT INTO rutina_cliente VALUES($1, $2, $3)', [uuidv4(),clienteId,rutinaId]);  

            res.send({
                status: "OK",
                statusCode: 200,
                results: "Cliente asignado"
            }) 
        }
    } catch(error){
         res.status(400).send(error)
    }
})

router.get('/', Auth.isAuth, Auth.isProf, async(req,res)=>{
    try{
        const { gimnasio_id } = (await pool.query('SELECT gimnasio_id FROM usuario WHERE id = $1', [req.user.id])).rows[0];
        const rutinas = (await pool.query('SELECT rutina.id, rutina.nombre, rutina.descripcion,rutina.frecuencia,rutina.duracion, usuario.nombre AS profesor FROM rutina INNER JOIN profesor ON profesor_id = profesor.id INNER JOIN usuario ON usuario.id = profesor.usuario_id WHERE usuario.gimnasio_id = $1', [gimnasio_id])).rows;
        if (!rutinas.length){
           return res.status(200).send({error: 'No hay rutinas disponibles'});
        }
        res.send(rutinas);
    } catch (error) {
        res.status(400).send(error);
    }

})

router.get('/cliente/:id', Auth.isAuth, async (req,res)=>{
    const id = req.query.userId === 'true' ? (await pool.query('SELECT cliente.id FROM cliente WHERE usuario_id = $1', [req.user.id])).rows[0].id : req.params.id;
    
    try {
        const rutinascliente = (await pool.query('SELECT rutina.id, rutina.nombre, rutina.descripcion, rutina.frecuencia, rutina.duracion, usuario.nombre AS profesor FROM rutina_cliente INNER JOIN rutina ON rutina_id = rutina.id INNER JOIN profesor ON profesor_id = profesor.id INNER JOIN usuario ON usuario_id = usuario.id WHERE cliente_id = $1', [id])).rows;
        res.send(rutinascliente)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/:id', Auth.isAuth, async (req,res)=>{
    const id = req.params.id;

    try {
        const rutinacliente = (await pool.query('SELECT rutina.id, rutina.nombre, rutina.descripcion, rutina.frecuencia, rutina.duracion FROM rutina WHERE rutina.id = $1', [id])).rows;
        res.send(rutinacliente)
    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router;