const express = require('express');
const router = express.Router();
const flightController = require('../../controller/flight.controller');

router.get('/', flightController.getFlight);

router.post('/addFlight', (req, res) => {
    console.log(req.body.test1);
    console.log(req.body.test2);
    res.redirect('/flight');
});

router.post('/editMaxMiddleAirport', flightController.editMaxMiddleAirport);

module.exports = router;