const passport = require('passport');
const LocalStrategy = require('passport-local');
const {UserModel} = require('../models/users');


const {validateNewUser, getUserByEmail, createUser} = require('../controllers/users');

const Logger = require('./logger');
const NotificationService = require('./notifications');


const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}
const signup = async ( req, username, password, done) => {
    try {
        Logger.info('Ingreso')
        Logger.info(req.body);

        const {firstName, lastName, age, admin, address } = req.body;

        if (validateNewUser(req.body)) {
            Logger.error('Datos invalidos')
            return done(null, false, {message: ' Datos incorrectos'})

        }

        const user = getUserByEmail(username)

        if (user) {
            Logger.error('El usuario ya existe')
            return done( null, false, {message: 'El usuario ya existe'})
        } else {


            const userData = {
                email: username,
                password,
                firstName,
                lastName,
                age,
                admin,
                address
            }
            const newUser = await createUser(userData)
            // await NotificationService.notifyNewUserByEmail(newUser)
            return done( null, newUser)
            
        }

    } catch (err) {
        throw ( err)
    };
}


const login = async ( req, username, password, done) => {
    Logger.info('Login');
    const user= await getUserByEmail(username);
    
    if (!user) {
        return done(null, false, {message: 'Username/ Password incorrecta'})
    }
    
    const isValidPassword = await user.isValidPassword(password)
    
    
    if (!isValidPassword) {
        return done(null, false, {message: 'Username / Password Incorrecta'})
    }

    Logger.info('Info correcta')
    return done (null, user);
}


const loginF = new LocalStrategy(strategyOptions, login)
const signupF = new LocalStrategy(strategyOptions, signup)

//serializar
passport.serializeUser((user,done) =>{
    Logger.info('Se ejecuta funcion')
    done(null, user._id)
})

passport.deserializeUser((userId, done)=>{
    UserModel.findById(userId).then((user)=>{
        return done(null, user)
    })
})


module.exports = {
    loginF, signupF
}