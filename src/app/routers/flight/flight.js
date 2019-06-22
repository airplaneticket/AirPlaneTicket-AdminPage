const express = require('express');
const router = express.Router();
const flightController = require('../../controller/flight.controller');
const flightMiddleware = require('../../middleware/flight.middleware');

router.get('/', flightController.getFlight);

router.post('/addFlight', flightMiddleware.isRightData, flightMiddleware.addFlight, flightController.addFlight);

router.post('/editMaxMiddleAirport', flightController.editMaxMiddleAirport);

router.post('/deleteFlight', flightController.deleteFlight);

router.post('/editFlight', flightController.editFlight);

router.post('/saveEditFlight', flightMiddleware.isRightData, flightMiddleware.saveEditFlight, flightController.saveEditFlight);

module.exports = router;