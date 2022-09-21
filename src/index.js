const Config = require('./config');
const db = require('./services/db');
const HTTPServer = require('./services/server');
const Logger = require('./services/logger');

const bodyParser = require('body-parser');

HTTPServer.use(bodyParser.json())
HTTPServer.use(bodyParser.urlencoded({ extended: true }));
const {PORT} = Config;

const init = async () =>{
    await db();
    const server = HTTPServer.listen(PORT, () => {
        console.log("Corriendo")
        Logger.info(`Servidor escuchando en el puerto ${PORT}`)
    })
    server.on('error', (error) => {
        Logger.error(`Error en servidor: ${error}`)
    });
};

init()
