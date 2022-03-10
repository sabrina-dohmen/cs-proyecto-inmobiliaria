const { Router } = require('express');
const jwt = require("jsonwebtoken");
const router = Router();


/**
 * @swagger
 * /login:
 *  post:
 *      summary: Ingreso del usuario y genera un token
 *      tags: [Token]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string,
 *                              example: "sabri@email.com"
 *                          pass:
 *                              type: string,
 *                              example: "sabri1234"
 */
router.post('/', (req, res) => {
    const { email, pass } = req.body;
    const user = {
        email: email,
        pass: pass
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '60s'}, (error, token) => {
        if(error) {
            res.json({ msj: "Error al generar el token"});
        }
        res.json({ token });
    });
});

module.exports = router;