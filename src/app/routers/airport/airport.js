const express = require('express');
const router = express.Router();

router.get('/airport',(req, res) => {
    res.render('adminpage/airport/airport.ejs');
})

module.exports = router;