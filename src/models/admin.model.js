const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let saltRound = 10;
let adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(this.password, saltRound)
        .then((hash) => {
            this.password = hash;
            next();
        });
});

adminSchema.methods.isRightPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

adminSchema.methods.forgotPassword = async function(hashString) {
    return bcrypt.hash(hashString, saltRound)
        .then((hash) => {
            this.password = hash;
        });
}

let adminModel = mongoose.model('adminModel', adminSchema, 'Admins');

module.exports = adminModel;