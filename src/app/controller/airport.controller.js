const airportModel = require('../../models/airport.model');
const formatData = require('../../services/formatData');


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
        res.status(500).send('server error: ', err);
    }
}

module.exports.deleteAirport = async(req, res) => {
    try {
        await airportModel.deleteOne({ _id: req.body.airportObjectId });
        let notify = "Xóa sân bay thành công"
        req.flash('notify', notify);
        res.redirect('/airport');
    } catch (err) {

    }
}