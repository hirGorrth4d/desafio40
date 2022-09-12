const Config = require('./config');
const db = require('./services/db');
const app = require('./services/server');
const Logger = require('./services/logger');

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const {PORT} = Config;

const init = async () =>{
    await db();
    const server = app.listen(PORT, () => {
        console.log("Corriendo")
        Logger.info(`Servidor escuchando en el puerto ${PORT}`)
    })
    server.on('error', (error) => {
        Logger.error(`Error en servidor: ${error}`)
    });
};

init()
