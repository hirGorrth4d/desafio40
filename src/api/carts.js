const {CartModel} = require('../models');
const{ NotificationService} = require('../services/notifications');
const {ApiError, ErrorStatus} = require('../api/error');
const ProductsApi = require('../api/products');

const create = (userId) => CartModel.create({userId})

const getCardByUser = (userId) => CartModel.findOne({userId})

const addProduct = async ( cartId, productId, items) => {
    const product = await ProductsApi.find(productId);

    if (!product) throw new ApiError ('Stock no disponible', ErrorStatus.BadRequest);

    if (!product.stock || items > product.stock) {
        throw new ApiError('Stock no disponible', ErrorStatus.BadRequest)
    }

    const cart = await CartModel.findById(cartId);

    if (!cart) throw new ApiError('Carrito no existe', ErrorStatus.BadRequest);

    const index = cart.products.findIndex(
        (aProduct) => aProduct.productId = productId,
    );

    if (index < 0) {
        const newProductItem = {
            productId: productId,
            items: Number(items),
        };
        cart.products.push(newProductItem);
    } else cart.products[index].items += items;

    await cart.save();

    await ProductsApi.removeStock(productId, items);

    return cart;
}

const deleteProducts = async (cartId, productId, items) => {
    const product = await ProductsApi.find(productId);
    
    if (!product) {
        throw new ApiError('Producto no existe', ErrorStatus.BadRequest);
    }

    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Carrito no existe', ErrorStatus.BadRequest);
    }

    const index = cart.products.findIndex(
        (aProduct) => {
            aProduct.productId == productId
        }
    );

    if (!items || cart.products[index].items <= items) {
        await ProductsApi.addStock(productId, cart.products[index].items);
        cart.products.splice(index, 1)
    } else {
        await ProductsApi.addStock(productId, items);
        cart.products[index].items -= items;
    }

    await cart.save();
    return cart
};

const emptyCart = async (cartId) => {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
        throw new ApiError('carrito no existe', ErrorStatus.BadRequest);

    }

    cart.products = []
    await cart.save();
    return cart;
};

const createOrder = async (cartId) => {
    const cart = await CartModel.findById(cartId);
    if (!cart.products.length) {
        throw new ApiError('No se puede crear una orden sin productos en el carrito', ErrorStatus.BadRequest)
    }
    await NotificationService.notifyNewOrderUsingWhatsapp(cart);
    await emptyCart(cartId)

}

module.exports  ={
    create, 
    addProduct,
    deleteProducts,
    getCardByUser,
    emptyCart,
    createOrder,
};