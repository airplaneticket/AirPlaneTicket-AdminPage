const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('adminpage/flight/flight.ejs');
})

module.exports = router;