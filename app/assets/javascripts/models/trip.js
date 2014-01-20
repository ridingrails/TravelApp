TravelApp.Models.Trip = Backbone.Model.extend({

	initialize: function() {
		this.lat = null;
		this.lng = null;
	},

	urlRoot: "/trips"
})