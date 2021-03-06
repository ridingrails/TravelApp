TravelApp.Views.NewExcursion = Backbone.View.extend({

	initialize: function(options) {
		this.listenTo(this.model, "all", this.render);
		this.info = options.info;
		this.trip = options.trip;
	},

	events: {
		"submit #new-excursion" : "createExcursion"
	},

	template: JST["excursions/new"],

	render: function() {

		var renderedContent = this.template({ excursion: this.model, info: this.info, trip: this.trip });
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

	createExcursion: function(event) {
		event.preventDefault();
		var that = this;
		var formData = $(event.currentTarget).serializeJSON();
		console.log(formData)
		var tripId = this.trip.get('id');
		formData.excursion.trip_id = tripId;
		formData.excursion.place = this.info.name;
		var excursion = new TravelApp.Models.Excursion(formData);
		excursion.save({}, {
			success: function (resp) {
				alert(' ex saved');
				Backbone.trigger("click div.user-photos", target);
				var view = new TravelApp.Views.TripShow({
					trip: this.trip
				});
				TravelApp.mainRouter._swapView(view);
				// TravelApp.mainRouter.navigate('/trips/' + tripId, { trigger: true });

			},

			error: function (resp) {
				alert(resp);
				//Add to validation div
				that.render();
			}
		});
	}
})