const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');
const { route } = require('./users');


router.post('/register', Auth.isAuth, Auth.isProfOrAdmin, async(req,res)=>{
    
    const { nombre, descripcion, horario,lunes,martes,miercoles,jueves,viernes,sabado,domingo, profesor } = req.body;
   
    try {
        const claseid=uuidv4();
        await pool.query("INSERT INTO clases VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", [claseid,nombre,descripcion,horario,lunes,martes,miercoles,jueves,viernes,sabado,domingo,profesor]);            
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
        const clases = await pool.query('SELECT id,nombre,descripcion,horario,lunes,martes,miercoles,jueves,viernes,sabado,domingo,profesor FROM clases').rows;
        if(!clases.lenght){
           return res.status(200).send({error: 'No hay clases disponibles',});
        }
        res.send(clases);
    } catch (error) {
        res.status(400).send(error);
    }

})

module.exports = router;
