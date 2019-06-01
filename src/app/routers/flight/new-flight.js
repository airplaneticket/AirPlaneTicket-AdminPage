const express = require('express');
const router = express.Router();

router.get('/new-flight',(req, res) => {
    res.render('adminpage/flight/new-flight.ejs');
})

module.exports= router;