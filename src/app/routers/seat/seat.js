const express = require('express');
const router = express.Router();
const seatController = require('../../controller/seat.controller');
const seatMiddleware = require('../../middleware/seat.middleware')
router.get('/', seatController.getSeat);
router.post('/add', seatMiddleware.isNotEmpty, seatMiddleware.addSeat, seatController.addSeat);
router.post('/delete', seatController.deleteSeat);
router.post('/edit', seatController.editSeat);
router.post('/saveEdit', seatMiddleware.isNotEmpty, seatMiddleware.saveEditSeat, seatController.saveEditSeat);

module.exports = router;