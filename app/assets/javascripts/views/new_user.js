TravelApp.Views.NewUser = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.model, "error", this.render);
	},

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
		alert('creating user');
		var that = this;
		var formData = $(event.currentTarget).serializeJSON();
		var user = new TravelApp.Models.User(formData);
		console.log(user);
		user.save({}, {
			success: function (resp) {
				$.cookie("session_token", resp.get("session_token"));
				TravelApp.mainRouter.navigate('users/' + user.id, { trigger: true });
			},

			error: function (resp) {
				alert(resp);
				//Add to validation div
				that.render();
			}
		});
	}
});