const airportModel = require('../../models/airport.model');
const formatData = require('../../services/formatData');
const _ = require('lodash');

module.exports.addAirport = async(req, res, next) => {
    let inputData = {
        airportCode: req.body.airportCode,
        airportName: req.body.airportName,
        locationCode: req.body.locationCode,
        locationName: req.body.locationName
    };
    let error;
    if (_.isEmpty(inputData.locationName))
        error = 'Vui lòng nhập Tên địa điểm';
    if (_.isEmpty(inputData.locationCode))
        error = 'Vui lòng nhập Mã địa điểm';
    if (_.isEmpty(inputData.airportName))
        error = 'Vui lòng nhập Tên sân bay';
    if (_.isEmpty(inputData.airportCode))
        error = 'Vui lòng nhập Mã sân bay';
    let airport = await airportModel.find({ airportCode: inputData.airportCode });
    if (airport.length > 0) {
        error = 'Đã có sân bay này trong dữ liệu'
    }
    if (typeof error === 'string') {
        req.flash('error', error);
        res.redirect('/airport');
        return;
    }
    req.airportData = inputData;
    next();
}

module.exports.saveEditAirport = async(req, res, next) => {
    let inputData = {
        airportCode: req.body.airportCode,
        airportName: req.body.airportName,
        locationCode: req.body.locationCode,
        locationName: req.body.locationName
    };
    let error;
    if (_.isEmpty(inputData.locationName))
        error = 'Vui lòng nhập Tên địa điểm';
    if (_.isEmpty(inputData.locationCode))
        error = 'Vui lòng nhập Mã địa điểm';
    if (_.isEmpty(inputData.airportName))
        error = 'Vui lòng nhập Tên sân bay';

    let airport = await airportModel.findOne({ airportCode: inputData.airportCode });

    if (inputData.airportName === airport.airportName &&
        inputData.locationCode === airport.locationCode &&
        inputData.locationName === airport.locationName) {
        error = "Thông tin không thay đổi";
    }
    if (typeof error === 'string') {
        req.flash('error', error);
        res.redirect('/airport');
        return;
    }
    req.saveAirportInfor = inputData;
    next();
}