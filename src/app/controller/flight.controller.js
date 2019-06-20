const flightModel = require('../../models/flight.model');
const seatTypeModel = require("../../models/seatType.model");
const airportModel = require("../../models/airport.model");
const maxMiddleAirportModel = require('../../models/maxMiddleAirport');
const formatData = require('../../services/formatData');

const _ = require('lodash');
const moment = require('moment');

module.exports.getFlight = async(req, res) => {
    let flights = await flightModel.find({});
    let seatTypes = await seatTypeModel.find({});
    let airports = await airportModel.find({});
    let maxMiddleAirport = await maxMiddleAirportModel.findOne({ id: 'PDAirline' });
    if (maxMiddleAirport == null) {
        let maxMiddleAirport = new maxMiddleAirportModel({ quantity: 2 });
        maxMiddleAirport.save();
    }
    res.render('adminpage/flight/flight.ejs', {
        flights,
        maxMiddleAirport: maxMiddleAirport.quantity,
        seatTypes,
        airports
    });
}


module.exports.editMaxMiddleAirport = async(req, res) => {
    try {
        if (_.isEmpty(req.body.maxMiddleAirport)) {
            req.flash('error', "Nhập giá trị để cập nhật");
            res.redirect('/flight');
        }
        let maxMiddleAirport = await maxMiddleAirportModel.findOne({ id: 'PDAirline' });
        _.assign(maxMiddleAirport, { quantity: req.body.maxMiddleAirport });
        maxMiddleAirport.save();
        req.flash('notify', 'Cập nhật số lượng sân bay tối đã');
        res.redirect('/flight');
    } catch (err) {
        res.status(500).send('server error');
    }
}

module.exports.addFlight = async(req, res) => {
    try {
        let inputdata = {...req.body };
        formatData.formatDataForFlight(inputdata);

        let flight = new flightModel(inputdata);
        await flight.save();
        req.flash("notify", "Thêm chuyến bay thành công");
        res.redirect('/flight');
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
    }
}

module.exports.deleteFlight = async(req, res) => {
    try {
        let flightObjectId = req.body.flightObjectId;
        console.log(flightObjectId);
        await flightModel.deleteOne({ _id: flightObjectId });
        req.flash("notify", "Xóa chuyến bay thành công");
        res.redirect('/flight');
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
        console.log(err);
    }
}