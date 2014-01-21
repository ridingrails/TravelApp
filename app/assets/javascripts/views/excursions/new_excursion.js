TravelApp.Views.NewExcursion = Backbone.View.extend({

	initialize: function(options) {
		this.info = options.info;
	},

	events: {
		// 'click .trip-submit': 'setTime'
	},

	events: {

	},

	template: JST["excursions/new"],

	render: function () {
		var renderedContent = this.template({ excursion: this.model, info: this.info });
		this.$el.html(renderedContent);
		return this;
	},

	setTime: function(event) {
		event.preventDefault();

	}
})