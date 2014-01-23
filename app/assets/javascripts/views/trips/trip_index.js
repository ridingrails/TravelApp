TravelApp.Views.TripIndex = Backbone.View.extend({
	template: JST["trips/trip_index"],

	events:  {
		'click .join' : 'join'
	},

	render: function() {
		var renderedContent = this.template({ trips: this.collection })
		this.$el.html(renderedContent);
		return this;
	},

	join: function(event) {
		event.preventDefault();
    var tripId = $(event.currentTarget).attr('data-id');
		console.log(tripId);
		var userId = TravelApp.currentUser.get('id');
    var data = {
    	reservation: {}
    };

		data.reservation.attendee_id = userId;
		data.reservation.trip_id = tripId;
		alert('trip id is ' + tripId);
		var reservation = new TravelApp.Models.Reservation(data);
    reservation.save({}, {
      success: function(resp) {
				console.log(resp);
			  TravelApp.mainRouter.navigate('/trips' + resp.attributes.trip_id,
							 																{ trigger: true });
      },

      error: function(resp) {
        window.alert("failed")
      }
    });

	}
})