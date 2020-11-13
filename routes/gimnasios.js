const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const Auth = require('../middleware/authentication');

router.get('/', Auth.isAuth, async(req,res)=>{
    try {
        const gimnasio  = (await pool.query("SELECT gimnasio.nombre, gimnasio.direccion FROM usuario INNER JOIN gimnasio ON gimnasio_id = gimnasio.id WHERE usuario.id = $1", [req.user.id])).rows[0];
        res.send(gimnasio);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;