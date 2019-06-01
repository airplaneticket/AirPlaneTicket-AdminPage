const express = require('express');
const router = express.Router();

router.get('/del-flight',(req, res) => {
    res.render('adminpage/flight/del-flight.ejs');
})

module.exports= router;