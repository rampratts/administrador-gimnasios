const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');


router.post('/', Auth.isAuth, Auth.isProfOrClient, async(req,res)=>{
    
    const { descripcion, fecha, usuario_id } = req.body;
   
    try {
        const sugerenciaid=uuidv4();
        await pool.query("INSERT INTO sugerencias VALUES($1, $2, $3, $4)", [sugerenciaid,descripcion,fecha,usuario_id]);            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Sugerencia creada"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;