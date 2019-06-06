const express = require('express');
const router = express.Router();
const flightController = require('../../controller/flight.controller');

router.get('/', flightController.getFlight);

router.post('/editMaxMiddleAirport', flightController.editMaxMiddleAirport);

module.exports = router;