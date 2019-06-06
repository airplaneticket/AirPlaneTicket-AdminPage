const airportModel = require('../../models/airport.model');
const formatData = require('../../services/formatData');
const _ = require('lodash');

module.exports.getAirport = async(req, res) => {
    let airports = await airportModel.find({});
    res.render('adminpage/airport/airport.ejs', {
        airports: airports
    });
}

module.exports.addAirport = async(req, res) => {
    try {
        let airport = new airportModel(req.airportData);
        await airport.save();
        let notify = "Thêm sân bay thành công"
        req.flash('notify', notify);
        res.redirect('/airport');
    } catch (err) {
        res.status(500).send('server error');
    }
}

module.exports.deleteAirport = async(req, res) => {
    try {
        await airportModel.deleteOne({ _id: req.body.airportObjectId });
        let notify = "Xóa sân bay thành công"
        req.flash('notify', notify);
        res.redirect('/airport');
    } catch (err) {
        res.status(500).send('Server error');
    }
}
module.exports.getEditAirport = async(req, res) => {
    try {
        let airport = await airportModel.findById(req.body.airportObjectId);
        req.airportInfor = airport;
        res.render('adminpage/airport/edit-airport.ejs', {
            airport
        });
    } catch (err) {
        res.status(500).send('server error');
    }
}
module.exports.saveEditAirport = async(req, res) => {
    try {
        let saveAirportInfor = req.saveAirportInfor;
        let airport = await airportModel.findOne({ airportCode: saveAirportInfor.airportCode });
        console.log(saveAirportInfor);
        _.assign(airport, saveAirportInfor);
        airport.save();
        req.flash('notify', "Cập nhật thông tin thành công");
        res.redirect('/airport');
    } catch (err) {

    }
}