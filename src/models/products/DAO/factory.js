const Logger = require('../../../services/logger');
const ProductsMongoDAO  = require('./mongo');
const ProductsMemDAO = require('./memory')

class ProductsFactoryDAO {
    static get(type) {
        switch(type) {
            case 'MEM':
                Logger.info('Instancia Memoria de Productos')
                return new ProductsMemDAO();
            case 'MONGO': 
                Logger.info('Instancia Mongo de Productos')
                return new ProductsMongoDAO();
            default:
                Logger.info('Instancia por defecto');
                return new ProductsMongoDAO();
        }
    }
}