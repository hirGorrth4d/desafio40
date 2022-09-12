const {CartApi} = require('../api/carts')

const {ApiError, ErrorStatus} = require('../api/error');

const getCart = async (req,res) => {
    const {user} = req;
    const cart = await CartApi.getCardByUser(user._id);
    res.json({
        data: cart,
    })
}

const addProduct = async (req,res) => {
    const {user} =req;
    const {productId, amount} = req.body;

    if (!productId || !amount) {
        throw new ApiError('Datos Invalidos', ErrorStatus.BadRequest);
    }

    const cart = await CartApi.getCardByUser(user._id);
    const result = await CartApi.addProduct(cart._id, productId, amount);
    res.json({msg: 'Product anadido', data: result});
}

const deleteProduct = async (req,res) => {
    const {user} = req;
    const {productId, amount} = req.body;
    if (!productId) {
        throw new ApiError('Datos invalidos', ErrorStatus.BadRequest);
    }
    const cart = await CartApi.getCardByUser(user._id);
    const result = await CartApi.deleteProducts(cart._id, productId, amount);

    res.json({msg: 'producto borrado', data: result});
}
const createOrder = async (req,res) => {
    const {user} = req;
    const cart = await CartApi.getCardByUser(user._id)

    await CartApi.createOrder(cart._id)

    res.json({
        msg: 'Orden creada',
    });
};

module.exports  = {
    getCart,
    addProduct,
    deleteProduct,
    createOrder,
}
