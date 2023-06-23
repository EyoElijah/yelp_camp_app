var mongoose = require('mongoose');
var Campground = require('./src/models/campground');
var Comment = require('./src//models/comment');

var data = [
	{
		name: 'Cloud rest',
		image: 'https://pixabay.com/get/g8dd0232ff6063c523269a28efbff02dfc36fef1207951a6821369ea181d31622268cd396147e696bd96bb2043cdf52c6_340.jpg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
	},
	{
		name: 'Desert Mesa',
		image: 'https://pixabay.com/get/geb23a2b465550c6c1c3abdfdac4e3566419effc99669cb64d59208d4cb9b3e3a5a35c56a97d2c041651479acc42c4353_340.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
	},
	{
		name: 'Canyon Floor',
		image: 'https://pixabay.com/get/g09a7f4f83b9677a18605d2132591cbcdb78552b6dca00d96019535532e4d19a725b13b8d312e1f7c67430556b64559ad_340.jpg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
	},
];

function seedDB() {
	// remove all campgrounds
	Campground.remove({}, (err) => {
		if (err) {
			console.log(err);
		}
		console.log('remove campgrounds!');
		data.forEach(function (seed) {
			Campground.create(seed, function (err, campground) {
				if (err) {
					console.log(err);
				} else {
					console.log('added a campground');
					// create a comment
					Comment.create(
						{
							text: 'This place is great, but i wished there was internet',
							author: 'Homer',
						},
						function (err, comment) {
							if (err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log('Created new comment');
							}
						}
					);
				}
			});
		});
		// add a few comment
	});
	// add a few campground
}

module.exports = seedDB;
