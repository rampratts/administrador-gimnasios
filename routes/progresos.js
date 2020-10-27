const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');

router.post('/', Auth.isAuth, Auth.isProf, async(req,res)=>{
    const { nombre, descripcion, cliente_id} = req.body;
    const { id } = (await pool.query('SELECT id FROM profesor WHERE usuario_id = $1', [req.user.id])).rows[0];

    try {
        const progresoid = uuidv4();

        await pool.query("INSERT INTO progreso VALUES($1, $2, $3, $4, $5)", [progresoid, nombre,descripcion,cliente_id,id]);            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Progreso registrado"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router;