const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');
const { route } = require('./users');



router.post('/register', Auth.isAuth, Auth.isProf, async(req,res)=>{
    
    const { nombre, descripcion, horario,profesor } = req.body;
   
    try {
    const claseid=uuidv4();
    const clienteclaseid=uuidv4();
    const { clienteid } = (await pool.query('SELECT id FROM cliente WHERE id_usuario = $1', [user.id])).rows[0];    
    await pool.query("INSERT INTO clases VALUES($1, $2, $3, $4, $5)", [claseid,nombre,descripcion,horario,profesor]);            
    await pool.query("INSERT INTO cliente_clases VALUES($1, $2, $3)", [clienteclaseid,clienteid,claseid,]);                      
            
    res.send({
        status: "OK",
        statusCode: 200,
        results: "lesson created"
    });

    } catch (error) {
    res.status(400).send(error);
    }
})


router.get('/get', Auth.isAuth, async(req,res)=>{
   try{
    
    const clases = [{ clase }] = await pool.query('SELECT id,nombre,descripcion,horario,profesor FROM clases as cl,');
    if(!clases){
        return res.status(200).send({error: 'No hay clases disponibles'});
    }
    
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
