TravelApp.Views.TopNavbar = Backbone.View.extend({

	events: {
		'click #sign_out' : 'signOut',
		'dashboard' : 'dashboard'
	},

	template: JST["layout/top_navbar"],

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	signOut: function() {
	  TravelApp.mainRouter.navigate('logout', { trigger: true });
	},

	dashboard: function() {
		var user =
	  TravelApp.mainRouter.navigate('', { trigger: true });
	},
});