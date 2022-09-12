const mongoose = require('mongoose');
const {categoryCollectionName} = require('./categories');

const productsCollectionName = 'product';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        stock: {type: Number, required: true},
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: categoryCollectionName,
            required: false,
        },
    },
    {versionKey: false, timestamps: true},
)

const ProductModel = mongoose.model(
    productsCollectionName, productSchema,
);

module.exports  = {productsCollectionName, ProductModel}