const express = require('express');
const router = express.Router();

router.get('/flight',(req, res) => {
    res.render('adminpage/flight/flight.ejs');
})

module.exports= router;