const express = require('express');
const router = express.Router();

router.get('/edit-flight',(req, res) => {
    res.render('adminpage/flight/edit-flight.ejs');
})

module.exports= router;