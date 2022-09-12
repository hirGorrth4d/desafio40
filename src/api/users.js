const {UserModel} = require('../models');


const find = (id) => {
    if (id) {
        return UserModel.findById(id)
    }
    return UserModel.find()
}
const findByEmail = (email) => {
    UserModel.findOne({email: email})

}

const create = (newUser) => {
    UserModel.create(newUser)
}

const update = (id, data) => {
    UserModel.findByIdAndUpdate(id, data, {
        new: true,
    });
}

const remove = (id) => {
    UserModel.findByIdAndDelete(id)
}

module.exports  = {
    find, findByEmail, create, update, remove
}
