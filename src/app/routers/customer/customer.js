const express = require('express');
const router = express.Router();

const customerControler = require('../../controller/customer.controller');

router.get('/', customerControler.getCustomer);

router.post('/delete', customerControler.deleteCustomer);

module.exports = router