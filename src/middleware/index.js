// all the middleware goes here
var Campground = require('../models/campground');
var Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, found) => {
			if (err) {
				req.flash('error', 'Campground not found');
				res.redirect('back');
			} else {
				if (found.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, found) => {
			if (err) {
				res.redirect('back');
			} else {
				if (found.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
};

middlewareObj.isLoggedOn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You need to be logged in to do that');
	res.redirect('/login');
};

module.exports = middlewareObj;
