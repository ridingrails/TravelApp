TravelApp.Views.NewSession = Backbone.View.extend({

	events: {
		"submit #new_session_form": 'createSession'
	},

	template: JST["session/form"],

	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	createSession: function (event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var session = new TravelApp.Models.Session(formData);
		session.save({}, {
			success: function () {
				$.cookie("session_token", resp.get("session_token"));
				console.log(resp);
				TravelApp.mainRouter.navigate('users/' + resp.get('id'),
					 																		{ trigger: true});
			},

			error: function (resp) {
				console.log("failed");
			}
		});
	}
});