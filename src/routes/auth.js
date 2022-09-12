const passport = require('passport');
const {Router} = require('express');
const Logger = require('../services/logger');
const {EmailService} = require('../services/notifications');

const passportOptions = {badRequestMessage: 'Usuario y/o contraseña invalidos'};

const signUp = (req,res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) =>{
        Logger.info('info signup');
        Logger.info(err, user, info);
        if (err) {
            return next(err)
        }
        if (!user) return res.status(401).json({data:info})
        res.json({msg: 'signup ok', user})
    })(req,res,next);
}

const login = (req,res,next) => {
    passport.authenticate('login', passportOptions, (err, user,info) =>{
        if (err) {
            return next (err)
        }
        if(!user) return res.status(401).json({data: info})
        req.login(user, function (err) {
            return res.json({msg: 'login ok', user})
        })
    }) (req,res,next)
}

const router = new Router()

router.post('/login', login)
router.post('/signup', signUp)

router.post('/logout', (req,res) => {
    req.session.destroy
    res.json({message: 'goodbye!'});
})

module.exports  = router;