const express = require('express');
const router = express.Router();

router.get('/edit-airport',(req, res) => {
    res.render('adminpage/airport/edit-airport.ejs');
})

module.exports= router;