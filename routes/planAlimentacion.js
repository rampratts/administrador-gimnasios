const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');

router.post('/', Auth.isAuth, Auth.isProf, async(req,res)=>{
    const { nombre, descripcion } = req.body;
    const { id } = (await pool.query('SELECT id FROM profesor WHERE usuario_id = $1', [req.user.id])).rows[0];

    try {
        const planAlimentacionid=uuidv4();
        await pool.query("INSERT INTO planAlimentacion VALUES($1, $2, $3, $4)", [planAlimentacionid,nombre,descripcion,id]);            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Plan alimentacion registrado"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/asignar-cliente', Auth.isAuth, Auth.isProf, async (req, res) => {
    const { planAlimentacionId, clienteId }  = req.body;
    
    try{
        const { count } = (await pool.query('SELECT count(*) FROM planAlimentacion_cliente WHERE planAlimentacion_id = $1 AND cliente_id = $2',[planAlimentacionId, clienteId])).rows[0];
        if(count > 0 ) {
            res.send({
                status: "FAIL",
                statusCode: 200,
                results: "Cliente ya asignado"
            })   
        } else {
            await pool.query('INSERT INTO planAlimentacion_cliente VALUES($1, $2, $3)', [uuidv4(),clienteId,planAlimentacionId]);  

            res.send({
                status: "OK",
                statusCode: 200,
                results: "Plan de alimnetacion asignado"
            }) 
        }
    } catch(error){
         res.status(400).send(error)
    }
})

router.get('/', Auth.isAuth, Auth.isProf, async(req,res)=>{
    try{
        const { gimnasio_id } = (await pool.query('SELECT gimnasio_id FROM usuario WHERE id = $1', [req.user.id])).rows[0];
        const planAlimentacion = (await pool.query('SELECT planAlimentacion.id, planAlimentacion.nombre, planAlimentacion.descripcion, usuario.nombre AS profesor FROM planAlimentacion INNER JOIN profesor ON profesor_id = profesor.id INNER JOIN usuario ON usuario.id = profesor.usuario_id WHERE usuario.gimnasio_id = $1', [gimnasio_id])).rows;
        if (!planAlimentacion.length){
           return res.status(200).send({error: 'No hay plan de alimentacion disponible'});
        }
        res.send(planAlimentacion);
    } catch (error) {
        res.status(400).send(error);
    }

})

router.get('/cliente/:id', Auth.isAuth, async (req,res)=>{
    const id = req.query.userId === 'true' ? (await pool.query('SELECT cliente.id FROM cliente WHERE usuario_id = $1', [req.user.id])).rows[0].id : req.params.id;

    try {
        const planAlimentacioncliente = (await pool.query('SELECT planAlimentacion.id, planAlimentacion.nombre, planAlimentacion.descripcion, usuario.nombre AS profesor FROM planAlimentacion_cliente INNER JOIN planAlimentacion ON planAlimentacion_id = planAlimentacion.id INNER JOIN profesor ON profesor_id = profesor.id INNER JOIN usuario ON usuario_id = usuario.id WHERE cliente_id = $1', [id])).rows;
        res.send(planAlimentacioncliente)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/:id', Auth.isAuth, async (req,res)=>{
    const id = req.params.id;

    try {
        const planAlimentacioncliente = (await pool.query('SELECT planAlimentacion.id, planAlimentacion.nombre, planAlimentacion.descripcion FROM planAlimentacion WHERE planAlimentacion.id = $1', [id])).rows;
        res.send(planAlimentacioncliente)
    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router;