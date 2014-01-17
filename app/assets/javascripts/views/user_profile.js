TravelApp.Views.UserProfile = Backbone.View.extend({

	// initialize: function() {
	//
	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	// },

	events: {
		'click #new_group': 'newGroup',
		'click #new_trip': 'newTrip'
	},

	template: JST["users/profile"],

	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	}


	// createUser: function (event) {
	// 	event.preventDefault();
	// 	var formData = $(event.currentTarget).serializeJSON();
	// 	var user = new TravelApp.Models.User(formData);
	// 	user.save({}, {
	// 		success: function () {
	// 			$.cookie("session_token", resp.get("session_token"));
	// 			console.log(resp);
	// 			TravelApp.mainRouter.navigate("", { trigger: true});
	// 		},
	//
	// 		error: function (resp) {
	// 			console.log("failed");
	// 		}
	// 	});
	// }
})