function guestMiddleware (req, res, next) {
    if(req.session.userLogged) {
        return res.redirect('userprofile')
    }
    next();
}
module.exports = guestMiddleware;