const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

module.exports = { mongoose };
