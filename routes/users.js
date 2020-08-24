const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const pool = require('../db/db');
const auth = require('../middleware/authentication');

router.post('/register',
    check('email').isEmail(),
    body('contrasena').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { nombre, apellido, email, contrasena, fecha_nacimiento, documento_identidad, telefono, fecha_inicio, tipo_usuario, gimnasio_id } = req.body;
        
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contrasena, salt);
            const userId = uuidv4();
            
            await pool.query("INSERT INTO usuario VALUES($1, $2, $3, $4, $5, TO_DATE($6, 'DD/MM/YYYY'), $7, $8, TO_DATE($9, 'DD/MM/YYYY'), $10, $11)", [userId, nombre, apellido, email, hashedPassword, fecha_nacimiento, documento_identidad, telefono, fecha_inicio, tipo_usuario, gimnasio_id]);            
            
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
            res.send(error);
        }
})


router.post('/login',
    check('email').exists(),
    check('password').exists(), 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await pool.query('SELECT id, username, email, password FROM users WHERE email = $1', [email]);
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
    
            if(!validPassword) {
                return res.status(400).send({'error': 'Invalid credentials'});
            }
            
            const jwtPayload = {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email,
            }

            const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

            res.send({token});
        } catch (error) {
            res.send(error)
        }

});

router.delete('/', auth, async (req, res) => {
    try {
        const response = await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);
        res.send({'result': 'User deleted'});
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/verifyToken', auth, (req, res) => { 
    try {
        res.json({
            auth: true,
            username: req.user.username
        })
    } catch(error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;
