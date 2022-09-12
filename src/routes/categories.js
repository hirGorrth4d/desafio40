const Handler = require('express-async-handler');
const {Router} = require('express');

const CategoryController = require('../controllers/categories')

const router = new Router()

router.get('/', Handler(CategoryController.getAllCategories))
router.get('/:id', Handler(CategoryController.getCategoryById))
router.post('/', Handler(CategoryController.createCategory))
router.put('/:id', Handler(CategoryController.updateCategory))
router.delete('/:id', Handler(CategoryController.deleteCategory))

module.exports  = router