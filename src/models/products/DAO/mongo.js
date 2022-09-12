const mongoose = require('mongoose');
const Logger = require('../../../services/logger');
const Config = require('../../../config/index');
const {ApiError, ErrorStatus} = require('../../../api/error');

class ProductMongoDao {
    static _connected = false;
    _client;
    _schema= new mongoose.Schema(
        {
            name: { type: String, required: true},
            description: {type: String, required: true},
            price: {type: Number, required:  true},
            stock: {type: Number, required: true},
            categoryId: {type: String, required: false},
            fyh: { type: String, default: new Date().toLocaleString()},

        },
        { versionKey: false}
    );
    _productos = mongoose.model('productos', this._schema)

    constructor(local = false) {
        Logger.info('Inicia DAO mongo')

        if (!ProductMongoDao._connected){
            Logger.info('Conexion no establecida, se crea conexion a mongo')
            ProductMongoDao._connected = true;
            const srv = local ? Config.MONGO_LOCAL_SRV : Config.MONGO_ATLAS_URL;
            mongoose.connect(srv, {}).then((connection) =>{
                this._client = connection
            })
        }
    }

    async obtenerProductos (id) {
        let output = [];
        if (id) {
            const document = await this._productos.findById(id);
            if(document) return [document]
            else throw new ApiError('Documento no existe', ErrorStatus.NotFound)
        }
        output = await this._productos.find();
        return output;
    }

    async guardarProducto(data) {
        const newProduct = await this._productos.create(data);
        return newProduct
    }

    async actualizarProducto(id, newProductData){
        const result = await this._productos.findByIdAndUpdate(id, newProductData, { new: true,})
        return result;
    }

    async borrarProducto(id) {
        await this._productos.findByIdAndDelete(id);
    }

}

module.exports = ProductMongoDao