const {Router} = require('express');
const AuthRouter = require('./auth');
const CategoryRouter = require('./categories');
const ProductRouter = require('./products');
const CartRouter = require('./cart');
const {isLoggedIn} = require('../controllers/users');

const router = new Router()


router.get('/hello', (req,res) => {
    res.json({msg: 'Hola', session: req.session})
});

router.use('/auth', AuthRouter)
router.use('/categories', CategoryRouter)
router.use('/products', ProductRouter)
router.use('/cart', isLoggedIn, CartRouter)

module.exports  = router