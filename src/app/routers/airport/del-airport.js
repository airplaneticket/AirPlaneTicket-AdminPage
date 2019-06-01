const express = require('express');
const router = express.Router();

router.get('/del-airport',(req, res) => {
    res.render('adminpage/airport/del-airport.ejs');
})

module.exports= router;