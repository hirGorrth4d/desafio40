const ProductsApi = require('../api/products');
const getAllProducts = async (req,res) => {
    try {
        const products =  await ProductsApi.find()
        
        res.send(products)
    } catch (err) {
        throw err
    };
}


const getProductById = async (req,res) => {
    const {id} = req.params;
    const product = await ProductsApi.find(id);

    if (!product) {
        return res.status(404).json({msg: 'Producto no encontrado'});
    }
    res.json({data: product})
}
const createProduct = async (req,res) => {
    const {name, description, stock, price, categoryId} =req.body;
    if (!name || !description || !stock || !price) {
        return res.status(400).json({msg: 'Datos invalidos'});
    }

    const newProduct = {
        name, description, stock, price, categoryId
    }
    const product = await ProductsApi.create(newProduct);

    res.json({
        msg: 'producto craeado',
        data: product
    })
}
const updateProduct = async (req,res) => {
    const {id} = req.params;
    const {name,description, stock, price, categoryId} = req.body;

    if (!name&&!description && !stock && !price) {
        return res.status(400).json({msg: 'datos invalidos'});
    }

    const newData = {
        name, description, stock, price, categoryId
    }

    const productUpdated = await ProductsApi.update(id, newData);

    res.json({
        msg: 'producto actualizado',
        data: productUpdated
    })
}

const deleteProduct = async (req,res) => {
    const {id} = req.params;
    const product = await ProductsApi.find(id);
    if (!product) {
        return res.status(404).json({msg: 'producto no encontrado'})
    }
    await ProductsApi.remove(id);

    res.json({msg: 'producto borrado'})
}

module.exports  = {
    getAllProducts, getProductById, createProduct, updateProduct, deleteProduct
}