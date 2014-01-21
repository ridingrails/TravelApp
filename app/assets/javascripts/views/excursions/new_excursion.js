TravelApp.Views.NewExcursion = Backbone.View.extend({

	initialize: function(options) {
		this.info = options.info;
	},

	events: {
		"click .event-time-submit" : "toggle"
	},

	template: JST["excursions/new"],

	timeTemplate: JST["excursions/time"],

	render: function() {
		var renderedContent = this.template({ excursion: this.model, info: this.info });
		this.$el.html(renderedContent);
		return this;
	},

	toggle: function(event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		if ($(event.currentTarget).hasClass('btn-success')) {
			$(event.currentTarget).removeClass('btn-success');
			$(event.currentTarget).addClass('btn-danger').text('Remove');
		} else {
			$(event.currentTarget).removeClass('btn-danger');
			$(event.currentTarget).addClass('btn-success').text('Add');
		}

	},

	setTime: function(event) {
		event.preventDefault();
		// var type = $(event.currentTarget).attr('data-type');
		alert('switching to time view');
	  $('.input-daterange').datepicker({});
	}
})