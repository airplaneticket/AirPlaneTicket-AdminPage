const flightModel = require('../../models/flight.model');
const seatTypeModel = require("../../models/seatType.model");
const airportModel = require("../../models/airport.model");
const maxMiddleAirportModel = require('../../models/maxMiddleAirport');
const formatData = require('../../services/formatData');

const _ = require('lodash');
const moment = require('moment');

const tiketModel = require('../../models/ticket.model');

module.exports.getFlight = async(req, res) => {
    try {
        let flights = await flightModel.find({});
        let seatTypes = await seatTypeModel.find({});
        let airports = await airportModel.find({});
        let maxMiddleAirport = await maxMiddleAirportModel.findOne({ id: "PDAirline" })
        let detail = [];
        for (flight of flights) {
            flight.flightDate = flight.flightDate.day + '-' + flight.flightDate.month + '-' + flight.flightDate.year;
            let detailItem = {
                flightId: flight.flightId,
                flightName: flight.flightName,
                numberOfSeatTypes: flight.numberOfSeatTypes,
                numberOfSeats: flight.numberOfSeats,
                priceOfSeats: flight.priceOfSeats,
                flightMiddleAirport: flight.flightMiddleAirport,
                flighMiddleAirportTime: flight.flightMiddleAirportTime,
            };
            detail.push(detailItem)
        }
        res.render('adminpage/flight/flight.ejs', {
            flights,
            maxMiddleAirport: maxMiddleAirport.quantity,
            seatTypes,
            airports,
            detail
        });


    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
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
        console.log(inputdata);
        formatData.formatDataForFlight(inputdata);
        let flight = new flightModel(inputdata);
        await flight.save();
        req.flash("notify", "Thêm chuyến bay thành công");
        res.redirect('/flight');
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
        console.log(err);
    }
}

module.exports.deleteFlight = async(req, res) => {
    try {
        let flightObjectId = req.body.flightObjectId;
        await flightModel.deleteOne({ _id: flightObjectId });
        req.flash("notify", "Xóa chuyến bay thành công");
        res.redirect('/flight');
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
        console.log(err);
    }
}

module.exports.editFlight = async(req, res) => {
    try {
        let flightObjectId = req.body.flightObjectId;
        let editFlight = await flightModel.findById(flightObjectId);
        let seatTypes = await seatTypeModel.find({});
        let airports = await airportModel.find({});
        let maxMiddleAirport = await maxMiddleAirportModel.findOne({ id: 'PDAirline' });
        editFlight = editFlight.toObject();
        if (editFlight.flightDate.month <= 9) {
            editFlight.flightDate = editFlight.flightDate.year + "-0" + editFlight.flightDate.month + "-" + editFlight.flightDate.day;
        } else {
            editFlight.flightDate = editFlight.flightDate.year + "-" + editFlight.flightDate.month + "-" + editFlight.flightDate.day;
        }
        res.render("adminpage/flight/edit-flight.ejs", {
            editFlight,
            seatTypes,
            airports,
            maxMiddleAirport: maxMiddleAirport.quantity
        });
    } catch (err) {
        res.status(500);
        res.send("Lỗi server hãy tải lại trang");
        console.log(err);
    }
}

module.exports.saveEditFlight = async(req, res) => {
    try {
        let inputData = req.inputData;
        let flight = await flightModel.findOne({ flightId: inputData.flightId });
        _.assign(flight, inputData);
        flight.save();
        req.flash('notify', "Cập nhật thông tin thành công");
        res.redirect('/flight');
    } catch (err) {

    }
}