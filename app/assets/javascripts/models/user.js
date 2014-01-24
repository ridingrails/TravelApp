TravelApp.Models.User = Backbone.Model.extend({
	parse: function(data) {
		var trips = data.trips;
		data.trips = new TravelApp.Collections.Trips(trips);
		var groups = data.groups_attended;
		data.groups = new TravelApp.Collections.Groups(groups);
		var interests = data.interests;
		data.interests = new TravelApp.Collections.Interests(interests);
		var memberships = data.memberships;
		data.memberships = new TravelApp.Collections.Memberships(memberships);
		var reservations = data.reservations;
		data.reservations = new TravelApp.Collections.Reservations(reservations);
		return data;
	},

	toJSON: function() {

	},

	urlRoot: "/users"
})

