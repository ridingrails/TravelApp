TravelApp.Models.Trip = Backbone.Model.extend({
	parse: function(data) {
		console.log(data);
		var excursions = data.excursions;
		data.excursions = new TravelApp.Collections.Excursions(excursions);
		var attendees = data.attendees;
		data.attendees = new TravelApp.Collections.Users(attendees);
		return data;
	},

	initialize: function() {
		this.lat = null;
		this.lng = null;
	},

	toJSON: function() {
		var data = _.clone(this.attributes);
		if (data.trip_photo) {
			data.trip.trip_photo = data.trip_photo;
			delete data.trip_photo;
		}
		return data;
	},

	urlRoot: "/trips"
})