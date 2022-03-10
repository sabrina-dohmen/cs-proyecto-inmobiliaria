// configuracion para la conexion con la base de datos

const config = {
    user:'sdohmen',
    password:'mysql',
    server: 'localhost',
    database: 'DBInmobiliaria',
    options: {
        trustedConnection: false,
        eneableArithPort: true,
        encrypt: false,
    }
}

module.exports = config;