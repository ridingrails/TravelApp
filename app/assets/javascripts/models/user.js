TravelApp.Models.User = Backbone.Model.extend({
	parse: function(data) {
		var trips = data.trips;
		data.trips = new TravelApp.Collections.Trips(trips);
		var groups = data.groups_attended;
		data.groups = new TravelApp.Collections.Groups(groups);
		var interests = data.interests;
		data.interests = new TravelApp.Collections.Interests(groups);
		return data;
	},

	toJSON: function() {

	},

	urlRoot: "/users"
})

