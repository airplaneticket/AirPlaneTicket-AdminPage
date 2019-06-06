const express = require('express');
const router = express.Router();
const airportController = require('../../controller/airport.controller');
const airportMiddleware = require('../../middleware/airport.middleware');
router.get('/', airportController.getAirport)
router.post('/edit', airportController.getEditAirport);
router.post('/saveEdit', airportMiddleware.isNotEmpty, airportMiddleware.saveEditAirport, airportController.saveEditAirport);
router.post('/add', airportMiddleware.isNotEmpty, airportMiddleware.addAirport, airportController.addAirport);
router.post('/delete', airportController.deleteAirport);
module.exports = router;