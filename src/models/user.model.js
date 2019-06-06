const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let saltRound = 10;
let usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    identityNumber: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    age: {
        type: Number
    },
    active: {
        type: Boolean,
        default: false
    }
});

usersSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(this.password, saltRound)
        .then((hash) => {
            this.password = hash;
            next();
        });
});

usersSchema.pre('update', function(next) {
    let user = this;
    console.log(this.password);
});

usersSchema.methods.forgotPassword = async function(hashString) {
    return bcrypt.hash(hashString, saltRound)
        .then((hash) => {
            this.password = hash;
        });
}

let userModel = mongoose.model('userModel', usersSchema, 'Users');

module.exports = userModel;