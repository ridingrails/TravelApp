TravelApp.Views.Home = Backbone.View.extend({

	events: {
		"click #new_user_form" : "newUser",
		"click #new_session_form" : "newSession",
    "click #sign_out" : "signOut",
	},

	template: JST["application/home"],

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	newUser: function(event) {
		event.preventDefault();
		TravelApp.mainRouter.navigate('users/new', { trigger: true });
	},

	newSession: function(event) {
		event.preventDefault();
		TravelApp.mainRouter.navigate('session/new', { trigger: true });
	},

	signOut: function(event) {
		event.preventDefault();
		var session = new TravelApp.Models.Session({
																session_token:
																$.cookie('session_token')
															});
			debugger
		session.destroy({
			success: function() {
				$.removeCookie('session_token');
				var view = new TravelApp.Views.Home();
				TravelApp.mainRouter.navigate('', { trigger: true });
			},

			error: function() {
				console.log('session not destroyed')
			}
		});
		TravelApp.mainRouter.navigate('', { trigger: true });
	}
	// me: function () {
	// 	event.preventDefault();
	// 	TravelApp.mainRouter.navigate('auth/facebook', { trigger: true });
	// }
});