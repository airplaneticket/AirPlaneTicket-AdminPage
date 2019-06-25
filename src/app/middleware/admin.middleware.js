const adminModel = require('../../models/admin.model');
const _ = require('lodash');
module.exports.postLogin = async(req, res, next) => {
    try {
        let inputData = {
            username: req.body.username,
            password: req.body.password
        }
        let admin = await adminModel.findOne({ username: inputData.username });
        if (!admin) {
            req.flash("error", "Sai tên đăng nhập");
            res.redirect('/admin/login');
            return;
        }
        let isRightPassword = await admin.isRightPassword(inputData.password);
        if (!isRightPassword) {
            req.flash("error", "Sai mật khẩu");
            res.redirect('/admin/login');
            return;
        } else {
            req.admin = admin;
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('Có lỗi xảy ra. Hãy tải lại trang');
    }
}

module.exports.postChangePassword = async(req, res, next) => {
    try {
        let inputData = {
            ...req.body
        };
        let admin = await adminModel.findOne({ username: "adminPD" });
        let isRightPassword = await admin.isRightPassword(inputData.oldPassword);
        if (!isRightPassword) {
            req.flash("error", "Bạn nhập sai mật khẩu cũ");
            res.redirect('/');
            return;
        }
        if (!_.isEqual(inputData.newPassword, inputData.newPasswordRepeat)) {
            req.flash("error", "Mật khẩu không trùng khớp");
            res.redirect('/');
            return;
        }
        req.inputData = inputData;
        next();
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('Có lỗi xảy ra. Hãy tải lại trang');
    }
}