const adminModel = require('../../models/admin.model');

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
        if (isRightPassword) {
            req.admin = admin;
            next();
            return;
        }
        req.flash("error", "Sai mật khẩu");
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('Có lỗi xảy ra. Hãy tải lại trang');
    }
}