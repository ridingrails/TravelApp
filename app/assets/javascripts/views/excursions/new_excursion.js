TravelApp.Views.NewExcursion = Backbone.View.extend({

	initialize: function(options) {
		this.info = options.info;
	},

	events: {
		"click .event-time-submit" : "createExcursion"
	},

	template: JST["excursions/new"],

	timeTemplate: JST["excursions/time"],

	render: function() {
		var renderedContent = this.template({ excursion: this.model, info: this.info });
		this.$el.html(renderedContent);
		return this;
	},

	toggle: function() {
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
	},

	createExcursion: function(formData, callback) {
		var that = this;
		var formData = $(event.currentTarget).serializeJSON();
		var tripId = formData
		var trip = new TravelApp.Models.Trip({});
		var excursion = new TravelApp.Models.User(formData);
		excursion.save({}, {
			success: function (resp) {
				$.cookie("session_token", resp.get("session_token"));
				TravelApp.mainRouter.navigate('excursions/' + excursion.id, { trigger: true });
				callback();
			},

			error: function (resp) {
				alert(resp);
				//Add to validation div
				that.render();
			}
		});
	}
})