TravelApp.Views.TripItem = Backbone.View.extend({

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

	template: JST["trips/item"],

	render: function () {
		var renderedContent = this.template({ trip: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})