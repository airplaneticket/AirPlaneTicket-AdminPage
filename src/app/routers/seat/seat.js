const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('adminpage/seat/seat.ejs')
})

module.exports = router;