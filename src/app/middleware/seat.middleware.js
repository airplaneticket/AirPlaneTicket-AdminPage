const mongoose = require('mongoose');
const _ = require('lodash');

const seatTypeModel = require('../../models/seatType.model');

module.exports.isNotEmpty = async(req, res, next) => {
    let error;
    let inputData = {
        name: req.body.name,
        seatTypeCode: req.body.seatTypeCode,
        _id: req.body.seatTypeId
    }
    if (_.isEmpty(inputData.name)) {
        error = "Vui lòng nhập tên hạng ghế"
    }
    if (_.isEmpty(inputData.seatTypeCode)) {
        error = "Vui lòng nhập mã hạng ghế"
    }
    if (typeof error === "string") {
        req.flash('error', error);
        res.redirect('/seat');
        return;
    }
    req.inputData = inputData;
    next();
}

module.exports.addSeat = async(req, res, next) => {
    let error;
    let inputData = req.inputData;
    let seat = await seatTypeModel.findOne({ $or: [{ name: inputData.name }, { seatTypeCode: inputData.seatTypeCode }] });
    if (seat) {
        error = "Đã có hạng ghế này trong dữ liệu";
    }
    if (typeof error === "string") {
        req.flash('error', error);
        res.redirect('/seat');
        return;
    }
    req.addSeatData = inputData;
    next();
}

module.exports.saveEditSeat = async(req, res, next) => {
    let inputData = req.inputData;
    let seat = await seatTypeModel.findById(inputData._id);
    if (seat.name === inputData.name) {
        req.flash("error", "Thông tin hạng ghê không thay đổi");
        res.redirect('/seat');
    }
    req.saveEditSeatData = inputData;
    next();
}