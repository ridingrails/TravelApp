TravelApp.Views.InterestItem = Backbone.View.extend({

	// initialize: function() {
	//
	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	// },

	// events: {
	// 	'click #new_group': 'newGroup',
	// 	'click #new_trip': 'newTrip'
	// },

	template: JST["interests/item"],

	render: function () {
		var renderedContent = this.template({ interest: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})