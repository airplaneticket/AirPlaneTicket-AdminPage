const express = require('express');
const router = express.Router();
router.get('/customer',(req, res) => {
    res.render('adminpage/customer/customer.ejs');
})
module.exports = router