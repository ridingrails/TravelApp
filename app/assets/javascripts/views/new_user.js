TravelApp.Views.NewUser = Backbone.View.extend({

	events: {
		'submit #new_user_form': 'createUser'
	},

	template: JST["users/form"],

	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	createUser: function (event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var user = new TravelApp.Models.User(formData);
		user.save({}, {
			success: function (resp) {
				window.alert('user created');
				$.cookie("session_token", resp.get("session_token"));
				TravelApp.mainRouter.navigate('users/' + user.id, { trigger: true });
			},

			error: function (resp) {
				console.log("failed");
				this.render();
			}
		});
	}
});