const systemMiddleware = require('../middleware/system.middleware');

module.exports = routers => {

    routers.use(systemMiddleware.hasSessionNotFoundUser);
    routers.use('/admin', require('./admin/admin'));
    // routers.use(systemMiddleware.requireLogin);
    routers.use('/', require('./adminpage/index'));
    routers.use('/flight', require('./flight/flight'));
    routers.use('/airport', require('./airport/airport'));
    routers.use('/customer', require('./customer/customer'));
    routers.use('/report', require('./report/report'));
    routers.use('/seat', require('./seat/seat'));

}