const jwt = require('jsonwebtoken');

class Auth {
    static isAuth(req, res, next) {
        const authHeader = req.header('Authorization');
   
        if(!authHeader) {
            res.status(403).send({'error': 'not authorized'});
        }
        
        try {
            const bearer = authHeader.split(' ');
            if(bearer[0] != 'Bearer') { 
                res.sendStatus(401);
            } else {
                const token = bearer[1];
                const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    
                req.user = verifiedToken;
                next();
            }
        } catch (e) {
            res.status(401).send({error: 'not auth'});
        }
    }

    static isProf(req, res, next) {
        if(req.user.tipo_usuario === 'prof') {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    static isAdmin(req, res, next) {
        if(req.user.tipo_usuario === 'admin') {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    static isClient(req, res, next) {
        if(req.user.tipo_usuario === 'cliente') {
            next();
        } else {
            res.sendStatus(401);
        }
    }
}

module.exports = Auth;