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
})