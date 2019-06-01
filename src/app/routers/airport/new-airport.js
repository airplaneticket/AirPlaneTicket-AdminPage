const express = require('express');
const router = express.Router();

router.get('/new-airport',(req, res) => {
    res.render('adminpage/airport/new-airport.ejs');
})

module.exports= router;