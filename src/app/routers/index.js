const systemMiddleware = require('../middleware/system.middleware');

module.exports = routers => {

    routers.use(systemMiddleware.hasSessionNotFoundUser);
    routers.use('/admin', require('./admin/admin'));
    routers.use(systemMiddleware.requireLogin);
    routers.use('/', require('./adminpage/index'));

    //Thao tác đối với chuyến bay
    routers.use('/flight', require('./flight/flight'));

    //Thao tác đối với sân bay
    routers.use('/airport', require('./airport/airport'));

    //Thao tác đối với khách hàng
    routers.use('/customer', require('./customer/customer'));

    routers.use('/report', require('./report/report'));

    routers.use('/seat', require('./seat/seat'));
    routers.use((req, res) => {
        res.status(404).send('404 error');
    })
}