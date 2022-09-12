const Handler = require('express-async-handler');
const {Router} = require('express');
const ProductController = require('../controllers/products');

const router = new Router()


router.get('/', Handler(ProductController.getAllProducts))
router.get('/:id', Handler(ProductController.getProductById))
router.post('/', Handler(ProductController.createProduct))
router.put('/:id', Handler(ProductController.updateProduct))
router.delete('/:id', Handler(ProductController.deleteProduct))


module.exports  = router