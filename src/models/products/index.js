const Joi = require('joi');
const  {ApiError, ErrorStatus} = require('../../api/error');

class Productos{
    constructor(name, description, price, stock, categoryId){
        this.name =name;
        this.description=description;
        this.price=price;
        this.stock=stock;
        this.categoryId=categoryId;
    }
    static validar (product, requerido){
        const schema = Joi.object({
            name: requerido? Joi.string().required() : Joi.string(),
            description: requerido? Joi.string().required() : Joi.string(),
            price: requerdio? Joi.number().required() : Joi.number(),
            stock: requerido? Joi.number().requerido() : Joi.number(),
            categoryId: requerido? Joi.string().required() : Joi.string(),
        });

        const { error } = schema.validate(product);
        if (error) throw new ApiError(error, ErrorStatus.BadRequest)
    }
}


module.exports = Productos