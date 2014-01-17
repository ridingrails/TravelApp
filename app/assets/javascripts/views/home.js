TravelApp.Views.Home = Backbone.View.extend({

	events: {
		"click #new_user_form":"newUser",
		"click #new_session_form":"newSession",
    "click #sign_out":"destroySession",
	},

	template: JST["application/home"],

	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	newUser: function (event) {
		event.preventDefault();
		TravelApp.mainRouter.navigate('users/new', { trigger: true });
	},

	newSession: function (event) {
		event.preventDefault();
		TravelApp.mainRouter.navigate('session/new', { trigger: true });
	},

	destroySession: function (event) {
		event.preventDefault();
		var user = new TravelApp.Models.User({
																session_token:
																$.cookie('session_token')
															});

		TravelApp.mainRouter.navigate('session/new', { trigger: true });
	}
	// me: function () {
	// 	event.preventDefault();
	// 	TravelApp.mainRouter.navigate('auth/facebook', { trigger: true });
	// }
});