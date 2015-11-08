var passport = require('passport');

module.exports.login = function(req, res, next){
    //req.session.redirectPath = req.get('Referrer');
    passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
};

module.exports.succeed = function(req, res){
    //res.redirect(req.session.redirectPath);
	res.redirect('/api/me');
};
