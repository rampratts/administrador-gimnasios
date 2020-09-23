const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');
module.exports = router;

router.post('/', Auth.isAuth, Auth.isAdmin, async(req,res)=>{
    
    const { estado_pago, fecha_pago, cliente,cantidad } = req.body;
   
    try {
        const pagoid=uuidv4();
        await pool.query("INSERT INTO pago VALUES($1, $2, $3, $4, $5)", [pagoid,estado_pago,fecha_pago,cliente,cantidad]);            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Pago registrado"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/', Auth.isAuth, Auth.isAdmin, async(req,res)=>{
    try{
        const { gimnasio_id } = (await pool.query('SELECT gimnasio_id FROM usuario WHERE id = $1', [req.user.id])).rows[0];
        const pago = (await pool.query('SELECT pago.id,pago.estado_pago,fecha_pago, usuario.nombre AS nombre_cliente FROM pago INNER JOIN cliente ON cliente_id = cliente.id INNER JOIN usuario ON usuario.id = cliente.usuario_id WHERE usuario.gimnasio_id = $1', [gimnasio_id])).rows;
        if(!pago.length){
           return res.status(200).send({error: 'No hay pagos registrados'});
        }
        res.send(pago);
    } catch (error) {
        res.status(400).send(error);
    }

})

module.exports = router;