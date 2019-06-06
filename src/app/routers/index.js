module.exports = routers => {
    routers.use('/', require('./adminpage/index'));

    //Thao tác đối với chuyến bay
    routers.use('/flight', require('./flight/flight'));

    //Thao tác đối với sân bay
    routers.use('/airport', require('./airport/airport'));

    //Thao tác đối với khách hàng
    routers.use('/customer', require('./customer/customer'));

    routers.use('/report', require('./report/report'));

    routers.use('/login',require('./login/login'));

    routers.use('/seat',require('./seat/seat'));
}