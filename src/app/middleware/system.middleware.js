module.exports.requireLogin = async function(req, res, next) {
    if (req.session.admin && req.signedCookies.adminSessionId)
        next();
    else {
        res.redirect('/admin/login');
    }
}


module.exports.hasSessionNotFoundUser = function(req, res, next) {
    if (req.signedCookies.adminSessionId && typeof req.session.admin === 'undefined')
        res.clearCookie('userSessionId');
    next();
}

module.exports.notLogin = (req, res, next) => {
    if (!req.session.admin && !req.signedCookies.adminSessionId)
        next();
    else
        res.redirect('/');
}