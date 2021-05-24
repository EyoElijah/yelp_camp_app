var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');
// INDEX - show all campgrounds
router.get('/', (req, res) => {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', { campground: allCampgrounds });
        }
    });
});

// CREATE - add new campground to DB
router.post('/', middleware.isLoggedOn, (req, res) => {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampgrounds = {
        name: name,
        image: image,
        description: description,
        price: price,
        author: author
    }
    Campground.create(newCampgrounds,
        function(err, campground) {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/campgrounds');
            }
        });
});


// NEW - show form to create a new campground
router.get('/new', middleware.isLoggedOn, (req, res) => {
    res.render('campgrounds/new');
});

// SHOW - show a specific campground
router.get('/:id', (req, res) => {
    // find the campground with the provided id
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            // console.log(foundCampground);
            // render show template with that campground
            res.render('campgrounds/show', { campground: foundCampground });
        }
    });
});

// Edit campground route

router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {

    Campground.findById(req.params.id, (err, found) => {

        res.render('campgrounds/edit', { campground: found });
    });

}); // update campground route 
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// destroy campground route

router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;