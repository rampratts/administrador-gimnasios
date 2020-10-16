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
        console.log(rutinaid)

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



module.exports = router;