const express = require('express')
const router = express.Router();
const adminController = require('../../controller/admin.controlerr');
const adminMiddleware = require('../../middleware/admin.middleware');

router.get('/login', adminController.getLogin);
router.post('/login', adminMiddleware.postLogin, adminController.postLogin);
router.get('/logout', adminController.getLogout);
router.post('/changePassword', adminMiddleware.postChangePassword, adminController.postChangePassword);

module.exports = router;