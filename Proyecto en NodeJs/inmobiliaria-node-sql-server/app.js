const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 9000;

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const alquilerRoutes = require('./src/routes/alquiler.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express(); // inicia servidor de express

app.use(bodyParser.json()); // parsear body usando formato json
app.use(cors()); // para habilitar los cors
const swaggerSpec = require('./src/doc/swaggerOptions'); // objeto con los parametros basicos de la doc en swagger
const swaggerDoc = swaggerJsDoc(swaggerSpec);

// indica a express usar las rutas
app.use('/alquiler', alquilerRoutes); // ruta para la gestion de los alquileres
app.use('/login', authRoutes); // ruta para el ingreso del usuario y generador del token
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc)); // ruta para la documentacion del proyecto visto con la interfaz de swagger

app.options('*', cors());
app.listen(port, () => { // escuchando puerto al levantar servidor
    console.log(`Servidor corriendo en puerto ${port}`);
});
