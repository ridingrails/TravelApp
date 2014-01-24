TravelApp.Views.TopNavbar = Backbone.View.extend({

	events: {
		'click #sign_out' : 'signOut',
		'click #profile' : 'profile',
  	'click #groups' : 'groupIndex',
		'click #trips' : 'tripIndex'
	},

	template: JST["layout/top_navbar"],

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	signOut: function(event) {
		event.preventDefault();
	  TravelApp.mainRouter.navigate('logout', { trigger: true });
	},

	profile: function(event) {
		event.preventDefault();
		var userId = 19;
	  TravelApp.mainRouter.navigate('/users/' + userId, { trigger: true });
	},

	groupIndex: function(event) {
		event.preventDefault();
	  TravelApp.mainRouter.navigate('/groups', { trigger: true });
	},

	tripIndex: function(event) {
		event.preventDefault();
	  TravelApp.mainRouter.navigate('/trips', { trigger: true });
	}
	// dashboard: function() {
	// 	var user =
	//   TravelApp.mainRouter.navigate('', { trigger: true });
	// },
});