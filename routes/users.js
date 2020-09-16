const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const pool = require('../db/db');
const Auth = require('../middleware/authentication');

router.post('/register',  Auth.isAuth, Auth.isAdmin,
    check('nombre_usuario').isEmail(),
    check('email').isEmail(),
    body('contrasena').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { nombre, nombre_usuario, apellido, email, contrasena, fecha_nacimiento, documento_identidad, telefono, fecha_inicio, tipo_usuario } = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contrasena, salt);
            const userId = uuidv4();
            const { gimnasio_id } = (await pool.query('SELECT gimnasio_id FROM usuario WHERE id = $1', [req.user.id])).rows[0];
            
            await pool.query("INSERT INTO usuario VALUES($1, $2, $3, $4, $5, $6, TO_DATE($7, 'YYYY-MM-DD'), $8, $9, TO_DATE($10, 'YYYY-MM-DD'), $11, $12)", [userId, nombre_usuario, nombre, apellido, email, hashedPassword, fecha_nacimiento, documento_identidad, telefono, fecha_inicio, tipo_usuario, gimnasio_id]);            
            
            if(tipo_usuario === 'admin') {
                await pool.query('INSERT INTO administrativo VALUES($1, $2, $3)', [uuidv4(), req.body.area, userId]);
            } else if(tipo_usuario === 'prof') {
                await pool.query('INSERT INTO profesor VALUES($1, $2, $3, $4)', [uuidv4(), req.body.area, req.body.calificado, userId]);
            } else if( tipo_usuario === 'cliente') {
                await pool.query('INSERT INTO cliente VALUES($1, $2, $3, $4, $5, $6)', [uuidv4(), req.body.pago_mensual, req.body.deuda, req.body.peso_actual, req.body.imc, userId]);
            }

            res.send({
                status: "OK",
                statusCode: 200,
                results: "User created"
            });
        } catch (error) {
            res.status(400).send(error);
        }
})

router.post('/comprobar-nombre-disponible', Auth.isAuth, Auth.isAdmin, async (req, res) => {
    const { nombre_usuario } = req.body;
    
    try {
        const { count } = (await pool.query('SELECT count(*) FROM usuario WHERE nombre_usuario = $1',[nombre_usuario])).rows[0];
        
        if(count == 0) {
            res.status(200).send({disponible: true});
        } else {
            res.status(200).send({disponible: false});
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/login',
    check('nombre_usuario').exists(),
    check('contrasena').exists(), 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { nombre_usuario, contrasena } = req.body;
        try {
            const user = (await pool.query('SELECT id, nombre_usuario, tipo_usuario, contrasena FROM usuario WHERE nombre_usuario = $1', [nombre_usuario])).rows[0];
            
            if(!user) {
                return res.status(200).send({error: 'No se encuentra el usuario'});
            }

            const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    
            if(!validPassword) {
                return res.status(400).send({'error': 'Invalid credentials'});
            }
            
            const jwtPayload = {
                id: user.id,
                nombre_usuario: user.nombre_usuario,
                tipo_usuario: user.tipo_usuario,
            }

            const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

            res.send({token});
        } catch (error) {
            res.send(error)
        }

});

router.delete('/', Auth.isAuth, async (req, res) => {
    try {
        switch(req.user.tipo_usuario) {
            case 'admin':
                await pool.query('DELETE FROM administrativo WHERE usuario_id = $1', [req.user.id]);
                break
            case 'prof':
                await pool.query('DELETE FROM profesor WHERE usuario_id = $1', [req.user.id]);
                break
            case 'cliente':
                await pool.query('DELETE FROM cliente WHERE usuario_id = $1', [req.user.id]);
                break
        }
        await pool.query('DELETE FROM usuario WHERE id = $1', [req.user.id]);
        res.status(200).send({
            status: "OK",
            statusCode: 200,
            results: "User deleted"
        });
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/verifyToken', Auth.isAuth, (req, res) => { 
    try {
        res.json({
            auth: true,
            nombre_usuario: req.user.nombre_usuario,
            tipo_usuario: req.user.tipo_usuario
        })
    } catch(error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

router.get('/profesores', Auth.isAuth, async(req,res) => {
    try {
        const {gimnasio_id} = (await pool.query('SELECT gimnasio_id FROM usuario WHERE id = $1', [req.user.id])).rows[0];
       
        const profesores = (await pool.query('SELECT profesor.id,usuario.nombre,usuario.apellido,area,calificado FROM profesor INNER JOIN usuario ON usuario_id = usuario.id WHERE usuario.gimnasio_id = $1', [gimnasio_id])).rows;
       
        if(!profesores.length){
            return res.status(200).send({error: 'No existen profesores'});
        }
          res.send(profesores);
    } catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;
