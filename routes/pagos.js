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
        await pool.query("INSERT INTO pagos VALUES($200, $300, $400, $500, $600 )", [pagoid,estado_pago,fecha_pago,cliente,cantidad]);            
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
        const pagos = (await pool.query('SELECT pagos.id,pagos.estado_pago,fecha_pago, usuario.nombre AS nombre_cliente FROM pagos INNER JOIN cliente ON cliente_id = cliente.id INNER JOIN usuario ON usuario.id = cliente.usuario_id WHERE usuario.gimnasio_id = $1', [gimnasio_id])).rows;
        if(!pagos.length){
           return res.status(200).send({error: 'No hay pagos registrados',});
        }
        res.send(pagos);
    } catch (error) {
        res.status(400).send(error);
    }

})