
const swaggerSpec = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'NodeJS SQL Server - Inmobiliaria API',
            version: '1.0.0'
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'http',
                name: 'Authorization',
            }
        },
        servers: [
            {
                url: 'http://localhost:9000'
            }
        ]
    },
    apis: ['app.js', 'src/routes/auth.routes.js', 'src/routes/alquiler.routes.js']
}


module.exports = swaggerSpec;