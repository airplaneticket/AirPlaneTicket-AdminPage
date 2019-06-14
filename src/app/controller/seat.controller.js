const mongoose = require('mongoose');
const seatTypeModel = require('../../models/seatType.model');
const _ = require('lodash');

module.exports.getSeat = async(req, res) => {
    let seats = await seatTypeModel.find({});
    res.render('adminpage/seat/seat.ejs', {
        seats
    });
}

module.exports.addSeat = async(req, res) => {
    try {
        let addSeatData = new seatTypeModel(req.addSeatData);
        addSeatData.save();
        req.flash('notify', "Thêm loại hạng ghế thành công");
        res.redirect('/seat');
    } catch (err) {
        res.status(500).send("server error");
    }
}

module.exports.deleteSeat = async(req, res) => {
    try {
        await seatTypeModel.deleteOne({ _id: req.body.seatTypeId });
        req.flash("notify", "Xóa hạng ghế thành công");
        res.redirect('/seat');
    } catch (err) {
        res.status(500).send("server error");
    }
}

module.exports.editSeat = async(req, res) => {
    try {
        let seat = await seatTypeModel.findOne({ _id: req.body.seatTypeId })
        console.log(seat);
        res.render('adminpage/seat/edit-seat.ejs', {
            seat: seat
        })
    } catch (err) {
        res.send(500).send('server error');
    }
}

module.exports.saveEditSeat = async(req, res) => {
    try {
        let saveEditSeatData = req.saveEditSeatData;
        let seat = await seatTypeModel.findOne({ _id: saveEditSeatData._id });
        _.assign(seat, saveEditSeatData);
        seat.save();
        req.flash('notify', "Cập nhật hạng ghế thành công");
        res.redirect('/seat');
    } catch (err) {
        res.status(500).send('server error');
        console.log(err);
    }
}