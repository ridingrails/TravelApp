TravelApp.Models.Dashboard = Backbone.Model.extend({
	initialize: function(options) {
	},

	urlRoot: function(){
	  "users/" + TravelApp.currentUser.id + "/?type=dashboard"
    //query string
	}
})