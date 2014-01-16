TravelApp.Views.NewSession = Backbone.View.extend({

	events: {
		"submit #new_session_form": 'createSession'
	},

	template: JST["users/form"],

	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	createSession: function (event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var session = new TravelApp.Models.User(formData);
		session.save({}, {
			success: function () {
				$.cookie("session_token", resp.get("session_token"));
				console.log(resp);
				TravelApp.mainRouter.navigate("", { trigger: true});
			},

			error: function (resp) {
				console.log("failed");
			}
		});
	}
});