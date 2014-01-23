TravelApp.Models.Group = Backbone.Model.extend({
	parse: function(data) {
		var members = data.members;
		data.members = new TravelApp.Collections.Groups(members);
		return data;
	},

	initialize: function(options) {
	},

	urlRoot: "/groups"
})