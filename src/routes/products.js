const Handler = require('express-async-handler');
const {Router} = require('express');
const ProductController = require('../controllers/products');
const axios = require('axios')
const router = new Router()

axios.get('/:id', ProductController.getProductById).then((response)=>{
    console.log(response)
}).catch((error) => {
    console.log(error)
})

axios.get('/', ProductController.getAllProducts).then((response)=>{
    console.log(response)
}).catch((error) =>{
    console.log(error)
})

axios.post('/', ProductController.createProduct).then((response) => {
    console.log(response)
}).catch((error)=>{
    console.log(error)
})


router.get('/', Handler(ProductController.getAllProducts))
router.get('/:id', Handler(ProductController.getProductById))
router.post('/', Handler(ProductController.createProduct))
router.put('/:id', Handler(ProductController.updateProduct))
router.delete('/:id', Handler(ProductController.deleteProduct))


module.exports  = router