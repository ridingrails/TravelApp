TravelApp.Views.NewTrip = Backbone.View.extend({

	events: {
		'submit #new_trip_form': 'createTrip'
	},

	template: JST["trips/form"],

	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	createTrip: function (event) {
		console.log("in new trip fx")
		event.preventDefault();
		console.log("in createtrip function");
		var formData = $(event.currentTarget).serializeJSON();
		var trip = new TravelApp.Models.Trip(formData);
		trip.save({}, {
			success: function (resp) {
				console.log(resp);
				TravelApp.mainRouter.navigate('trips/' + resp.get('id'), { trigger: true});
			},

			error: function (resp) {
				console.log("failed");
			}
		});
	}
});