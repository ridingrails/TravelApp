TravelApp.Views.Home = Backbone.View.extend({

	events: {
		"click #new_user_form":"newUser",
		"click #new_session_form":"newSession"
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
	}
});