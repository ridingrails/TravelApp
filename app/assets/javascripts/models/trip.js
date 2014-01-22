TravelApp.Models.Trip = Backbone.Model.extend({
	parse: function(data) {
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

	urlRoot: "/trips"
})