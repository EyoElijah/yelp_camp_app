let express = require('express'),
	{ mongoose } = require('./db/mongoose'),
	Campground = require('./models/campground'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	flash = require('connect-flash'),
	app = express(),
	seedDB = require('../seeds'),
	ejs = require('ejs'),
	path = require('path'),
	dotenv = require('dotenv');

const port = process.env.PORT;
const secret = process.env.SECRET;

dotenv.config();

var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

// seed the database
// seedDB();

// PASSPORT CONFIGURATION
app.use(
	require('express-session')({
		secret: secret,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(port, () => {
	console.log(`Started at port ${port}`);
});
