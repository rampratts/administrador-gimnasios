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
        console.log(req.user.id);
        await pool.query("INSERT INTO sugerencia VALUES($1, $2, TO_DATE($3, 'YYYY-MM-DD'), $4)", [sugerenciaid,descripcion,fecha,req.user.id]);            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Sugerencia creada"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/', Auth.isAuth, Auth.isAdmin, async (req,res) => {
    try {
        const { gimnasio_id } = (await pool.query('SELECT gimnasio_id FROM Usuario WHERE id = $1', [req.user.id])).rows[0];
        const sugerencias = (await pool.query('SELECT sugerencia.id,sugerencia.descripcion,sugerencia.fecha, usuario.nombre, usuario.apellido, usuario.email FROM sugerencia INNER JOIN usuario ON usuario_id = usuario.id WHERE usuario.gimnasio_id = $1 ORDER by fecha DESC', [gimnasio_id])).rows;
        if (!sugerencias.length) {
            return res.status(200).send({error: 'No hay sugerencias'});   
    }
        res.send(sugerencias); 
    } catch (error) {
        res.status(400).send(error);  
    }
})

router.get('/:id', Auth.isAuth, Auth.isAdmin, async (req, res) => {
    try {
        const { gimnasio_id } = (await pool.query('SELECT gimnasio_id FROM Usuario WHERE id = $1', [req.user.id])).rows[0];
        const sugerencia = (await pool.query('SELECT sugerencia.id,sugerencia.descripcion,sugerencia.fecha, usuario.nombre, usuario.apellido, usuario.email FROM sugerencia INNER JOIN usuario ON usuario_id = usuario.id WHERE usuario.gimnasio_id = $1 AND sugerencia.id = $2 ORDER by fecha DESC', [gimnasio_id, req.params.id])).rows[0];
        res.send(sugerencia); 
    } catch (error) {
        res.status(400).send(error);  
    }
})

module.exports = router;