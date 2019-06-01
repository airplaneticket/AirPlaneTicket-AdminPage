module.exports = routers => {
    routers.use('/',require('./adminpage/index'));
    
    //Thao tác đối với chuyến bay
    routers.use('/',require('./flight/new-flight'));
    routers.use('/',require('./flight/edit-flight'));
    routers.use('/',require('./flight/del-flight'));

    //Thao tác đối với sân bay
    routers.use('/',require('./airport/new-airport'));
    routers.use('/',require('./airport/edit-airport'));
    routers.use('/',require('./airport/del-airport'));
}