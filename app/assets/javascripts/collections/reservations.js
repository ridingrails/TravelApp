TravelApp.Collections.Reservations = Backbone.Collection.extend({
	model: TravelApp.Models.Reservation,
	url: '/reservations'
})