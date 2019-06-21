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
    delete req.body;
    res.clearCookie("adminSessionId");
    req.flash("notify", "Đã đăng xuất");
    res.redirect('/admin/login');
}