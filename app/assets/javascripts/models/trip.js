TravelApp.Models.Trip = Backbone.Model.extend({

	initialize: function() {
		this.latLng = null;
	},

	urlRoot: "/trips"
})