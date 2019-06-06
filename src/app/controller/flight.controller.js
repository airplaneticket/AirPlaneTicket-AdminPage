const flightModel = require('../../models/flight.model');
const maxMiddleAirportModel = require('../../models/maxMiddleAirport');
const _ = require('lodash');

module.exports.getFlight = async(req, res) => {
    let flights = await flightModel.find({});
    let maxMiddleAirport = await maxMiddleAirportModel.findOne({ id: 'PDAirline' });
    if (maxMiddleAirport == null) {
        let maxMiddleAirport = new maxMiddleAirportModel({ quantity: 2 });
        maxMiddleAirport.save();
    }
    res.render('adminpage/flight/flight.ejs', {
        flights,
        maxMiddleAirport: maxMiddleAirport.quantity
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