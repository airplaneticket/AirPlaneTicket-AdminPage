const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('adminpage/login/login.ejs');
})

module.exports = router;