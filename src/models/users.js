const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCollectionName = 'user';

const UserSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        age: {type: Number, required: true, min: 18},
        admin: {type: Boolean, default: false},
        address: {
            street: {type: String, required: true},
            city: {type: String, required: true},
        },
    },
    {versionKey: false, timestamp: true},
);
UserSchema.pre('save', async (next)=> {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    this.password = hash;
    next();
});

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const UserModel = mongoose.model(userCollectionName, UserSchema);
module.exports = {UserModel, userCollectionName}