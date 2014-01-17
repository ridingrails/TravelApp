TravelApp.Models.Session = Backbone.Model.extend({
	initialize: function() {
		this.session_token = $.cookie('session_token');
	},

	urlRoot: "/session"
})