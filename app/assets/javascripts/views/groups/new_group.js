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

	createGroup: function (event) {
		console.log("in new group fx")
		event.preventDefault();
		console.log("in createGroup function");
		var formData = $(event.currentTarget).serializeJSON();
		var group = new TravelApp.Models.Group(formData);
		group.save({}, {
			success: function (resp) {
				console.log(resp);
				TravelApp.mainRouter.navigate('groups/' + resp.get('id'), { trigger: true});
			},

			error: function (resp) {
				console.log("failed");
			}
		});
	}
});