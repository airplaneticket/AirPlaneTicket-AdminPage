const express = require('express')
const router = express.Router();
const adminController = require('../../controller/admin.controlerr');
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.getLogout);
module.exports = router;