const airportModel = require('../../models/airport.model');
const formatData = require('../../services/formatData');
module.exports.addAirport = async(req, res, next) => {
    let inputData = {
        airportCode: req.body.airportCode,
        airportName: req.body.airportName,
        locationCode: req.body.locationCode,
        locationName: req.body.locationName
    };
    let notify;
    if (inputData.locationName === '')
        notify = 'Vui lòng nhập Tên địa điểm';
    if (inputData.locationCode === '')
        notify = 'Vui lòng nhập Mã địa điểm';
    if (inputData.airportName === '')
        notify = 'Vui lòng nhập Tên sân bay';
    if (inputData.airportCode === '')
        notify = 'Vui lòng nhập Mã sân bay';
    let airport = await airportModel.find({ $or: [{ airportCode: inputData.airportCode }, { airportName: inputData.airportName }] });
    if (airport.length > 0) {
        notify = 'Đã có sân bay này trong dữ liệu'
    }
    if (typeof notify === 'string') {
        req.flash('notify', notify);
        res.redirect('/airport');
        return;
    }
    req.airportData = inputData;
    next();
}