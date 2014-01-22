TravelApp.Models.Excursion = Backbone.Model.extend({
	initialize: function(options) {
		this.tripId = options.tripId;
	},

	urlRoot: "/excursions"
})