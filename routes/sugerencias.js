const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');


router.post('/', Auth.isAuth, Auth.isProfOrClient, async(req,res)=>{
    
    const { descripcion, fecha } = req.body;
   
    try {
        const sugerenciaid=uuidv4();
        await pool.query("INSERT INTO sugerencias VALUES($1, $2, $3, $4)", [sugerenciaid,descripcion,fecha,req.user.id]);            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Sugerencia creada"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/', Auth.isAuth, async(req,res)=>{
    try{
        const {gimansio_id} =(await pool.query('SELECT gimansio_id FROM Usuario WHERE id = $', [req.user.id])).rows[0];
        const sugerencias = (await pool.query('SELECT sugerencia.id,sugerencia.descripcion,sugerencia.fecha, usuario.nombre, usuario.apellido, usuario.email FROM sugerencia INNER JOIN usuario ON usuario_id = usuario.id WHERE usuario.gimansio_id = $1', [gimansio_id])).rows;
        if (!sugerencias.length){
            return res.status(200).send({error: 'No hay sugerencias'});   
        }
        res.send(sugerencias); 
    } catch (error) {
        res.status(400).send(error);  
    }
})

module.exports = router;