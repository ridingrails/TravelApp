TravelApp.Views.NewGroup = Backbone.View.extend({

	events: {
		'submit #new_group_form': 'createGroup'
	},

	template: JST["groups/form"],

	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	createUser: function (event) {
		console.log("in new user fx")
		event.preventDefault();
		console.log("in createUser function");
		var formData = $(event.currentTarget).serializeJSON();
		var user = new TravelApp.Models.User(formData);
		user.save({}, {
			success: function () {
				$.cookie("session_token", resp.get("session_token"));
				console.log(resp);
				TravelApp.mainRouter.navigate('users/' + user.id, { trigger: true});
			},

			error: function (resp) {
				console.log("failed");
			}
		});
	}
});