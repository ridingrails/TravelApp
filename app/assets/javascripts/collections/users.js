TravelApp.Collections.Users = Backbone.Collection.extend({
	model: TravelApp.Models.User,
	url: '/users'
})