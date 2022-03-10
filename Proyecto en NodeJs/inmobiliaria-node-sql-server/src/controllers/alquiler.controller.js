let config = require('../db/db-config');
const sql = require('mssql');
const Alquiler = require('../models/alquiler');

async function getAll() {
    try {
        let pool = await sql.connect(config); // conexion con la base de datos
        let query = await pool.request().execute('sp_alquiler_getAll'); // ejecucion del sp
        return query.recordset; // devuelve el resultado de la query
    } catch (error) {
        console.log(error);
    }
}

async function getById(id) {
    try {
        let pool = await sql.connect(config);
        let query = await pool.request()
            .input('id', sql.Int, id) // insercion del id en en el sp para ejecutarlo
            .execute('sp_alquiler_getById');
        return query.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getByFilter(activo, localidadId, departamentoId){
    try {
        let pool = await sql.connect(config);
        let query = await pool.request()
            .input('activo', sql.TinyInt, activo)
            .input('localidadId', sql.Int, localidadId)
            .input('departamentoId', sql.Int, departamentoId)
            .execute('sp_alquiler_getByFilter');
        return query.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function save(data) {
    let alquiler = new Alquiler;
    alquiler = data; // recibo la data en el modelo con el cual trabajar en los input
    try {
        let pool = await sql.connect(config);

        let query = await pool.request()
            .input('inmuebleId', sql.Int, alquiler.inmuebleId)
            .input('inquilinoId', sql.Int, alquiler.inquilinoId)
            .input('fechaInicio', sql.Date, alquiler.fechaInicio)
            .input('fechaFinal', sql.Date, alquiler.fechaFinal)
            .input('duracionContrato', sql.Int, alquiler.duracionContrato)
            .input('porcentajeAumento', sql.Float, alquiler.porcentajeAumento)
            .input('periodoAumento', sql.Int, alquiler.periodoAumento)
            .input('activo', sql.TinyInt, 1)
            .execute('ps_alquiler_save')
            return query.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function update(id, data) {
    let alquiler = new Alquiler;
    alquiler = data;
    try {
        let pool = await sql.connect(config);

        let query = await pool.request()
            .input('id', sql.Int, id)
            .input('inmuebleId', sql.Int, alquiler.inmuebleId)
            .input('inquilinoId', sql.Int, alquiler.inquilinoId)
            .input('fechaInicio', sql.Date, alquiler.fechaInicio)
            .input('fechaFinal', sql.Date, alquiler.fechaFinal)
            .input('duracionContrato', sql.Int, alquiler.duracionContrato)
            .input('porcentajeAumento', sql.Float, alquiler.porcentajeAumento)
            .input('periodoAumento', sql.Int, alquiler.periodoAumento)
            .input('activo', sql.TinyInt, 1)
            .execute('ps_alquiler_update')
            
            return query.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function desactivate(id) {
    try {
        let pool = await sql.connect(config);
        let query = await pool.request()
            .input('id', sql.Int, id)
            .execute('sp_alquiler_delete')
        return query.recordset;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { // se exportan las funciones con mismo nombre de referencia
    getAll: getAll,
    getById: getById,
    getByFilter: getByFilter,
    save: save,
    update: update,
    desactivate: desactivate
}