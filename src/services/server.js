const express = require('express');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const session = require('express-session');
const Config = require('../config');
const {signupF, loginF} = require('./auth');
const mainRouter = require('../routes');
const Logger = require('./logger');
const cors = require('cors');
const http = require('http');
const app = express()

app.use(express.json())

const ttlSeconds = 1800;

const corsOptions = {
    origin: ['http://localhost:5000'],
    optionSuccessStatus: 200,
    methods: 'GET, POST'
}

app.use(cors(corsOptions))


const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: Config.MONGO_ATLAS_URL,
        crypto: {
            secret: Config.SESSION_SECRET_KEY
        }
    }),
    secret: Config.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
}

app.use(session(StoreOptions))

app.use(passport.initialize())
app.use(passport.session())
passport.use('login', loginF)
passport.use('signup', signupF)

app.use('/api', mainRouter)


app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const msg = err.message || 'Internal Server Error';
    const stack =err.stack;

    Logger.error(err)
    res.status(status).send({msg, stack})
    res.status(status).send({msg, stack})
})

const HTTPServer = http.createServer(app)
module.exports = HTTPServer;
