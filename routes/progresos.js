const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');

router.post('/', Auth.isAuth, Auth.isProf, async(req,res)=>{
    const { descripcion, fecha, cliente_id} = req.body;
    const { id } = (await pool.query('SELECT id FROM profesor WHERE usuario_id = $1', [req.user.id])).rows[0];

    try {
        const progresoid = uuidv4();

        await pool.query("INSERT INTO progreso VALUES($1, $2, TO_DATE($3, 'YYYY-MM-DD'), $4, $5)", [progresoid,descripcion, fecha,id,cliente_id]);            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Progreso registrado"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/:id', Auth.isAuth, async(req,res) => {
    const id = req.query.userId === 'true' ? (await pool.query('SELECT cliente.id FROM cliente WHERE usuario_id = $1', [req.user.id])).rows[0].id : req.params.id;
    try{
        const progresosCliente = (await pool.query('SELECT progreso.id, progreso.descripcion, progreso.fecha, usuario.nombre AS profesor FROM progreso INNER JOIN profesor ON profesor_id = profesor.id INNER JOIN usuario ON usuario_id = usuario.id WHERE cliente_id = $1 ORDER by fecha DESC', [id])).rows;
        res.send(progresosCliente)
    } catch (error) {    
        res.status(400).send(error);
    }
})


module.exports = router;