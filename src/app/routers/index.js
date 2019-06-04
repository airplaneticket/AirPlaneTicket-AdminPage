module.exports = routers => {
    routers.use('/',require('./adminpage/index'));
    
    //Thao tác đối với chuyến bay
    routers.use('/',require('./flight/flight'));

    //Thao tác đối với sân bay
    routers.use('/',require('./airport/airport'));

    //Thao tác đối với khách hàng
    routers.use('/',require('./customer/customer'));
}