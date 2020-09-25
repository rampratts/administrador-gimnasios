const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, body, validationResult } = require('express-validator');
const pool = require('../db/db');
const Auth = require('../middleware/authentication');

router.post('/', Auth.isAuth, Auth.isAdmin, async(req,res)=>{
    
    const { estado_pago, fecha_pago, cliente,cantidad } = req.body;
   
    try {
        const pagoid=uuidv4();
        await pool.query("INSERT INTO pago VALUES($1, $2, $3, $4, $5)", [pagoid,estado_pago,fecha_pago,cliente,cantidad]);
        await pool.query('UPDATE cliente SET deuda = (SELECT SUM(cantidad) FROM pago INNER JOIN cliente ON cliente_id = cliente.id WHERE cliente.id = $1 AND estado_pago = false)WHERE cliente.id = $1', [cliente])            
        res.send({
            status: "OK",
            statusCode: 200,
            results: "Pago registrado"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/mis-pagos', Auth.isAuth, Auth.isClient, async (req, res) => {
    const id = req.user.id;

    try {
        const pago = (await pool.query('SELECT pago.id, pago.estado_pago, pago.fecha_pago, pago.cantidad FROM pago INNER JOIN cliente ON cliente_id = cliente.id WHERE cliente.usuario_id = $1', [id])).rows;
        res.send(pago)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/:id', Auth.isAuth, Auth.isAdmin, async (req,res)=>{
    const id = req.params.id;

    try {
        const pagoscliente = (await pool.query('SELECT pago.id, pago.estado_pago, pago.fecha_pago, pago.cantidad, usuario.nombre, usuario.apellido FROM pago INNER JOIN cliente ON cliente_id = cliente.id INNER JOIN usuario ON usuario.id = cliente.usuario_id WHERE cliente.id = $1 ORDER by fecha_pago DESC', [id])).rows;
        res.send(pagoscliente)
    } catch (error) {
        res.status(400).send(error);
    }
})
router.patch('/marcar-pago', Auth.isAuth, Auth.isAdmin, async (req,res) => {
    const { pago_id } = req.body;
    try{
        const { cliente_id } = (await pool.query('SELECT cliente_id FROM pago WHERE pago.id = $1', [pago_id])).rows[0];
        console.log(cliente_id)
        await pool.query('UPDATE pago SET estado_pago = true WHERE pago.id = $1', [pago_id]);
        await pool.query('UPDATE cliente SET deuda = (SELECT SUM(cantidad) FROM pago INNER JOIN cliente ON cliente_id = cliente.id WHERE cliente.id = $1 AND estado_pago = false)WHERE cliente.id = $1', [cliente_id]);            
        res.send({
            statusCode: 200,
            status: "OK",
            results: "Pago marcado con exito"
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;