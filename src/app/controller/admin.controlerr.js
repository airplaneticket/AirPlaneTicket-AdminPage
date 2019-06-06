const adminModel = require('../../models/admin.model');

module.exports.getLogin = async(req, res) => {
    try {
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
    let inputData = {
        username: req.body.username,
        password: req.body.password
    }
    admin = await adminModel.findOne({ username: inputData.username });
    req.session.admin = admin;
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
    res.redirect('/');
}

module.exports.getLogout = async(req, res) => {
    delete req.body;
    res.clearCookie("adminSessionId");
    req.flash("notify", "Đã đăng xuất");
    res.redirect('/admin/login');
}