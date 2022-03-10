const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../controllers/auth.controller');
const { getAll, getById, getByFilter, save, update, desactivate } = require('../controllers/alquiler.controller');
const Alquiler = require('../models/alquiler');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      Filter:
 *           type: object
 *           properties:
 *               activo:
 *                  type: integer,
 *                  example: 1
 *               localidadId:
 *                  type: integer,
 *                  example: 2
 *               departamentoId:
 *                  type: integer,
 *                  example: null
 *      Alquiler:
 *          type: object
 *          properties:
 *              inmuebleId:
 *                  type: integer,
 *                  description: fk que referencia el id del inmueble alquilado
 *                  example: 1
 *              inquilinoId:
 *                  type: integer,
 *                  description: fk que referencia el id del inquilino que alquila
 *                  example: 3
 *              fechaInicio:
 *                  type: date,
 *                  description: fecha de inicio del contrato de alquiler
 *                  example: "2021-11-22T00:00:00.000Z"
 *              fechaFinal:
 *                  type: date,
 *                  description: fecha de finalizacion del contrato de alquiler
 *                  example: "2022-06-30T00:00:00.000Z"
 *              duracionContrato:
 *                  type: integer,
 *                  description: tiempo de duracion del contrato en meses
 *                  example: 12
 *              porcentajeAumento:
 *                  type: float,
 *                  description: porcentaje de aumento del precio inicial del alquiler
 *                  example: 0.15
 *              periodoAumento:
 *                  type: integer,
 *                  description: tiempo comprendido para el porcentaje de aumento
 *                  example: 12
 *              activo:
 *                  type: tinyint
 *                  description: estado del alquiler. activo = 1, inactivo = 0
 *                  example: 1
 */

/**
 * @swagger
 * /alquiler:
 *  get:
 *      summary: trae todos los alquileres
 *      tags: [Alquiler]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: header
 *          name: "Authorization"
 *          type: string
 *          required: true
 */
router.get('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, tokenData) => {
        console.log(req.token);

        if (error) {
            res.status(403).json({ msj: "Acceso denegado." });
        } else {
            const user = tokenData.user.email;
            getAll().then((data) => {
                res.json({ data, user }); // parsea la respuesta del controller a formato json
            });
        }
    });
});

/**
 * @swagger
 * /alquiler/filter:
 *  post:
 *      summary: "Trae Lista de Alquileres por filtro"
 *      tags: [Alquiler]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: header
 *          name: "Authorization"
 *          type: string
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Filter'
 */
router.post('/filter', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, tokenData) => {
        if (error) {
            res.status(403).json({ msj: "Acceso denegado." });
        } else {
            const user = tokenData.user;
            const { activo, localidadId, departamentoId } = req.body; // toma los datos mandados desde el body
            getByFilter(activo, localidadId, departamentoId).then((data) => {
                res.json({ data, user });
            });
        }
    });
});

/**
 * @swagger
 * /alquiler/{id}:
 *  get:
 *      summary: "Trae una lista de Alquileres por ID"
 *      tags: [Alquiler]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: header
 *          name: "Authorization"
 *          type: string
 *          required: true
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 */
router.get('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, tokenData) => {
        if (error) {
            res.status(403).json({ msj: "Acceso denegado." });
        } else {
            const user = tokenData.user;
            const { id } = req.params; //toma el id de la url
            getById(id).then((data) => {
                res.json({ data, user });
            });
        }
    });
});

/**
 * @swagger
 * /alquiler:
 *  post:
 *      summary: registra un nuevo alquiler
 *      tags: [Alquiler]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: header
 *          name: "Authorization"
 *          type: string
 *          required: true
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Alquiler'
 */
router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, tokenData) => {
        if (error) {
            res.status(403).json({ msj: "Acceso denegado." });
        } else {
            const user = tokenData.user;
            const { inmuebleId, inquilinoId, fechaInicio, fechaFinal, duracionContrato, porcentajeAumento, periodoAumento } = req.body;

            let alquiler = new Alquiler; // modelo donde se almacenan los datos recibidos del body
            alquiler.inmuebleId = inmuebleId;
            alquiler.inquilinoId = inquilinoId;
            alquiler.fechaInicio = fechaInicio;
            alquiler.fechaFinal = fechaFinal;
            alquiler.duracionContrato = duracionContrato;
            alquiler.porcentajeAumento = porcentajeAumento;
            alquiler.periodoAumento = periodoAumento;

            save(alquiler).then((data) => {
                res.json({ data, user });
            });
        }
    });
});

/**
 * @swagger
 * /alquiler/{id}:
 *  put:
 *      summary: Actualizar por ID un Alquiler registrado
 *      tags: [Alquiler]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: header
 *          name: "Authorization"
 *          type: string
 *          required: true
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Alquiler'
 */
router.put('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, tokenData) => {
        if (error) {
            res.status(403).json({ msj: "Acceso denegado." });
        } else {
            const user = tokenData.user;
            const { id } = req.params;
            const { inmuebleId, inquilinoId, fechaInicio, fechaFinal, duracionContrato, porcentajeAumento, periodoAumento } = req.body;

            let alquiler = new Alquiler;
            alquiler.inmuebleId = inmuebleId;
            alquiler.inquilinoId = inquilinoId;
            alquiler.fechaInicio = fechaInicio;
            alquiler.fechaFinal = fechaFinal;
            alquiler.duracionContrato = duracionContrato;
            alquiler.porcentajeAumento = porcentajeAumento;
            alquiler.periodoAumento = periodoAumento;

            update(id, alquiler).then((data) => {
                res.json({ data, user });
            });
        }
    });
});

/**
 * @swagger
 * /alquiler/{id}:
 *  delete:
 *      summary: Desactiva un Alquiler por ID
 *      tags: [Alquiler]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: header
 *          name: "Authorization"
 *          type: string
 *          required: true
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 */
router.delete('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, tokenData) => {
        if (error) {
            res.status(403).json({ msj: "Acceso denegado." });
        } else {
            const user = tokenData.user;
            const { id } = req.params;

            desactivate(id).then((data) => {
                res.json({ data, user });
            });
        }
    });
});

module.exports = router;