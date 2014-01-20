TravelApp.Views.UserProfile = Backbone.View.extend({

	initialize: function() {
	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	},

	events: {
		'click #new-group': 'newGroup',
		'click #new-trip': 'newTrip',
	},

	template: JST["users/profile"],

	render: function () {
		var groups = this.model.get('groups');
		var trips = this.model.get('trips');
		var interests = this.model.get('interests');
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		var that = this;
		groups.each(function(group) {
			var view = new TravelApp.Views.GroupItem({ model: group });
	    that.$('#groups').append(view.render().$el);
		});
		trips.each(function(trip) {
			var view = new TravelApp.Views.TripItem({ model: trip });
			that.$('#trips').append(view.render().$el);
		});
		interests.each(function(interest) {
			var view = new TravelApp.Views.InterestItem({ model: interest });
			that.$('#interests').append(view.render().$el);
		});
		return that;
	},

	newTrip: function(event) {
		event.preventDefault();
		TravelApp.mainRouter.navigate('trips/new', { trigger: true });
	},

	renderSubView: function(view, selector) {
		alert('about to render sub view');
		selector.append(view.render().$el);
	}
})