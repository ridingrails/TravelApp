TravelApp.Collections.TripsPlanned = Backbone.Collection.extend({
	model: TravelApp.Models.Trip,
	url: '/trips'
})