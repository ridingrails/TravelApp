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
		var that = this;
		var groups = this.model.get('groups');
		var trips = this.model.get('trips');
		var interests = this.model.get('interests');
		var renderedContent = this.template({ user: this.model });
		groups.each(function(group) {
			var view = new TravelApp.Views.GroupItem({ model: group });
			$('.groups').append(view.render().$el);
		});
		trips.each(function(trip) {
			var view = new TravelApp.Views.TripItem({ model: trip });
			$('.trips').append(view.render().$el);
		});
		interests.each(function(interest) {
			var view = new TravelApp.Views.InterestItem({ model: interest });
			$('.interests').append(view.render().$el);
		});
		this.$el.html(renderedContent);
		return this;
	}
})