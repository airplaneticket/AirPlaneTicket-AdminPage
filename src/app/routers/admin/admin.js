const express = require('express')
const router = express.Router();
const adminController = require('../../controller/admin.controlerr');
const adminMiddleware = require('../../middleware/admin.middleware');
const path = require('path');

router.get('/login', adminController.getLogin);
router.post('/login', adminMiddleware.postLogin, adminController.postLogin);
router.get('/logout', adminController.getLogout);
module.exports = router;