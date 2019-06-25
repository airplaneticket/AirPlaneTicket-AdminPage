const adminModel = require('../../models/admin.model');

module.exports.getLogin = async(req, res) => {
    try {
        if (req.session.admin && req.signedCookies.adminSessionId) {
            res.redirect('/');
        }
        let admin = await adminModel.find({});
        if (admin.length === 0) {
            let admin = new adminModel({ username: "adminPD", password: "adminPD" });
            admin.save();
        }
        res.render('adminpage/login/login.ejs');
    } catch (err) {
        res.status(500).send('sever error');
    }
}

module.exports.postLogin = async(req, res) => {
    let admin = req.admin;
    req.session.admin = admin;
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
    req.flash("notify", "Đăng nhập thành công");
    res.redirect('/');
}

module.exports.getLogout = async(req, res) => {
    req.session.destroy();
    res.clearCookie("adminSessionId");
    res.redirect('/admin/login');
}

module.exports.postChangePassword = async(req, res) => {
    try {
        let inputData = req.inputData;
        let admin = await adminModel.findOne({ username: 'adminPD' });
        admin.password = inputData.newPassword;
        admin.save();
        res.redirect('/admin/logout');;
    } catch (err) {
        console.log(err);
        res.status(500).send('sever error');
    }
}