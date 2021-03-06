const flightModel = require("../../models/flight.model");
const _ = require('lodash');
const moment = require('moment');
const formatData = require('../../services/formatData');

module.exports.isRightData = (req, res, next) => {
    let inputData = {
        ...req.body
    };
    let error;
    if (typeof inputData.flightMiddleAirport === 'object') {
        for (let i = 0; i < inputData.flightMiddleAirport.length; i++) {
            if (inputData.flightMiddleAirport[i] !== 'Chọn sân bay trung gian') {
                if (_.isEmpty(inputData.flightMiddleAirportTime[i])) {
                    error = 'Vui lòng nhập thời gian ở sân bay trung gian ' + inputData.flightMiddleAirport[i];
                }
                for (let j = 0; j < inputData.flightMiddleAirport.length; j++) {
                    if (inputData.flightMiddleAirport[i] === inputData.flightMiddleAirport[j] && j !== i) {
                        error = 'Vui lòng chọn sân bay trung gian khác nhau';
                    }
                }
            }
        }
    }
    let isInputSeatType = false;
    if (typeof inputData.numberOfSeats === 'object') {
        for (let i = 0; i < inputData.numberOfSeats.length; i++) {
            if (!_.isEmpty(inputData.numberOfSeats[i])) {
                isInputSeatType = true;
                if (_.isEmpty(inputData.priceOfSeats[i])) {
                    error = 'Vui lòng nhập giá của hạng ghế ' + inputData.numberOfSeatTypes[i];
                }
            }
        }
    }
    if (!isInputSeatType) {
        error = 'Vui lòng nhập số lượng ghế của ít nhất một hạng ghế';
    }
    if (inputData.flightDestination === 'Chọn sân bay đến')
        error = 'Vui lòng chọn sân bay đến';
    if (inputData.flightFrom === 'Chọn sân bay đi')
        error = 'Vui lòng chọn sân bay đi';
    if (inputData.flightFrom === inputData.flightDestination)
        error = 'Vui lòng chọn sân bay đi khác sân bay đến';
    if (typeof error === 'string') {
        req.flash('error', error);
        res.redirect('/flight');
        return;
    }

    req.inputData = inputData;
    next();
}

module.exports.addFlight = async(req, res, next) => {
    let inputData = req.inputData;
    let inputTime = inputData.flightDate + "T" + inputData.flightDepartTime + ":00";
    let totalFlightMiddleAirportTime = 0;
    let flightTime = inputData.flightTime.split(":").map(num => parseInt(num));
    flightTime = flightTime[0] * 60 + flightTime[1];
    for (let i = 0; i < inputData.flightMiddleAirportTime.length; i++) {
        if (!_.isEmpty(inputData.flightMiddleAirportTime[i])) {
            let splitTime = inputData.flightMiddleAirportTime[i].split(":").map(num => parseInt(num));
            totalFlightMiddleAirportTime = splitTime[0] * 60 + splitTime[1];
        }
    }
    let flight = await flightModel.findOne({ $or: [{ flightId: inputData.flightId }, { flightName: inputData.flightName }] });
    if (moment(inputTime).isBefore(moment())) {
        req.flash("error", "Vui lòng nhập giờ khởi hành lớn hơn hiện tại");
        res.redirect('/flight');
        return;
    } else if (flight) {
        req.flash("error", "Chuyến bay đã có trong cơ sở dữ liệu");
        res.redirect('/flight');
        return;
    } else if (flightTime < totalFlightMiddleAirportTime) {
        req.flash("error", "Thời gian bay bé hơn thời gian ở sân bay trung gian! Xin kiểm tra lại");
        res.redirect('/flight');
        return;
    } else {
        inputData.flightDate = moment(inputTime).format();
        req.inputData = inputData;
        next();
    }

}

module.exports.saveEditFlight = async(req, res, next) => {
    let inputData = {...req.body };
    let oldData = await flightModel.findOne({ flightId: inputData.flightId });
    let checkData = await flightModel.findOne({ flightName: inputData.flightName });
    oldData = oldData.toObject();
    formatData.formatDataForFlight(inputData);
    delete oldData._id;
    delete oldData.__v;
    if (_.isEqual(oldData, inputData)) {
        req.flash("error", "Thông tin chuyến bay không thay đổi");
        res.redirect('/flight');
        return;
    } else if (checkData.flightId !== oldData.flightId) {
        req.flash("error", "Tên chuyến bay đã có trong cơ sở dữ liệu");
        res.redirect('/flight');
        return;
    } else {
        req.inputData = inputData;
        next();
    }
}