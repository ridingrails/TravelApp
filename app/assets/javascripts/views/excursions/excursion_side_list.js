TravelApp.Views.ExcursionSideList = Backbone.View.extend({

	initialize: function(options) {
		this.trip = options.trip;
	},

	template: JST["excursions/side_list"],

	render: function() {
		alert('yeahhhh!');
		var renderedContent = this.template({ trip: this.trip })
		this.$el.html(renderedContent);
		return this;
	}

})