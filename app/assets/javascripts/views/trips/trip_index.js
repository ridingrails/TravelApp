TravelApp.Views.TripIndex = Backbone.View.extend({
	initialize: function() {

	},

	template: JST["trips/trip_index"],

	render: function() {
		alert('rendering')
		var that = this;
		var renderedContent = that.template({ trips: that.collection })
		this.$el.html(renderedContent);
		var trips = that.collection;
		trips.each(function(trip) {
			console.log(trip);
			var view = new TravelApp.Views.TripIndexItem({ model: trip });
			that.$el.append(view.render().$el);
		});
		return that;
	},

	refresh: function() {
		var that = this;
		TravelApp.mainRouter._swapView(that);
	}
})