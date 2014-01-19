TravelApp.Views.TripShow = Backbone.View.extend({

	initialize: function() {
	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	},

	events: {
	},

	template: JST["trips/profile"],

	render: function () {
		var renderedContent = this.template({ trip: this.model });
		this.$el.html(renderedContent);
		// var groups = this.model.get('groups');
		// var trips = this.model.get('trips');
		// var interests = this.model.get('interests');
		// var renderedContent = this.template({ user: this.model });
		// this.$el.html(renderedContent);
		// var that = this;
		// groups.each(function(group) {
		// 	var view = new TravelApp.Views.GroupItem({ model: group });
		// 	    that.$('#groups').append(view.render().$el);
		// });
		// trips.each(function(trip) {
		// 	var view = new TravelApp.Views.TripItem({ model: trip });
		// 	that.$('#trips').append(view.render().$el);
		// });
		// interests.each(function(interest) {
		// 	var view = new TravelApp.Views.InterestItem({ model: interest });
		// 	that.$('#interests').append(view.render().$el);
		// });
		return this;
	},

	showTripDetail: function(event) {
		event.preventDefault();
		alert('in show trip');
		var dataId = $(event.currentTarget).attr('data-id');
		TravelApp.mainRouter.navigate( 'trips/' + dataId, { trigger:true });
	},

	_mapMonths: function(num) {
		var map = {
			"01":"January",
			"02":"February",
			"03":"March",
			"04":"April",
			"05":"May",
			"06":"June",
			"07":"July",
			"08":"August",
			"09":"September",
			"10":"October",
			"11":"November",
			"12":"December"
		}
		return map[num];
	}
})