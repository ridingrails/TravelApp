TravelApp.Views.ExcursionSideList = Backbone.View.extend({

	initialize: function(options) {
		this.trip = options.trip;
	},

	template: JST["excursions/side_list"],

	render: function() {
		var renderedContent = this.template({ trip: trip })
		this.$el.html(renderedContent);
		return this;
	}

})