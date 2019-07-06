const airportModel = require("../../models/airport.model");
const formatData = require("../../services/formatData");
const _ = require("lodash");

module.exports.isNotEmpty = (req, res, next) => {
    let inputData = {
        airportCode: req.body.airportCode,
        airportName: req.body.airportName,
        locationCode: req.body.locationCode,
        locationName: req.body.locationName
    };
    let error;
    if (_.isEmpty(inputData.locationName)) error = "Vui lòng nhập Tên địa điểm";
    if (_.isEmpty(inputData.locationCode)) error = "Vui lòng nhập Mã địa điểm";
    if (_.isEmpty(inputData.airportName)) error = "Vui lòng nhập Tên sân bay";
    if (_.isEmpty(inputData.airportCode)) error = "Vui lòng nhập Mã sân bay";
    if (typeof error === "string") {
        req.flash("error", error);
        res.redirect("/airport");
        return;
    } else {
        req.inputData = inputData;
        next();
    }
};

module.exports.addAirport = async(req, res, next) => {
    let inputData = req.inputData;
    let error;
    let airport = await airportModel.find({ airportCode: inputData.airportCode });
    if (airport.length > 0) {
        error = "Đã có sân bay này trong dữ liệu";
    }
    if (typeof error === "string") {
        req.flash("error", error);
        res.redirect("/airport");
        return;
    } else {
        req.airportData = inputData;
        next();
    }
};

module.exports.saveEditAirport = async(req, res, next) => {
    let inputData = req.inputData;
    let error;
    let airport = await airportModel.findOne({
        airportCode: inputData.airportCode
    });
    let checkAirport = await airportModel.findOne({ airportName: inputData.airportName });
    if (checkAirport.airportCode !== airport.airportCode) {
        error = "Trùng tên sân bay";
    }
    if (
        inputData.airportName === airport.airportName &&
        inputData.locationCode === airport.locationCode &&
        inputData.locationName === airport.locationName
    ) {
        error = "Thông tin không thay đổi";
    }
    if (typeof error === "string") {
        req.flash("error", error);
        res.redirect("/airport");
        return;
    } else {
        req.saveAirportInfor = inputData;
        next();
    }
};