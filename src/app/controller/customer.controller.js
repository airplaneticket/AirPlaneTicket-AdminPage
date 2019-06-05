const userModel = require('../../models/user.model');

module.exports.getCustomer = async(req, res) => {
    let users = await userModel.find({});
    res.render('adminpage/customer/customer.ejs', {
        users: users,
    })
}

module.exports.deleteCustomer = async(req, res) => {
    try {
        await userModel.deleteOne({ _id: req.body.userObjectId });
        let notify = "Xóa người dùng thành công"
        req.flash('notify', notify);
        res.redirect('/customer');
    } catch (err) {
        res.status(500).send('Server error')
    }
}