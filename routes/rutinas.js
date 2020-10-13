const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');

router.post('/', Auth.isAuth, Auth.isProf, async(req,res)=>{
    const {descripcion, frecuencia, duracion} = req.body;

    try {
        const rutinaid=uuidv4();
        await pool.query("INSERT INTO rutina VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", [rutinaid,descripcion,frecuencia,duracion]);            
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