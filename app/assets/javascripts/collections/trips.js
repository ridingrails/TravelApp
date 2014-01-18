TravelApp.Collections.Trips = Backbone.Collection.extend({
	model: TravelApp.Models.Trip,
	url: '/trips'
})