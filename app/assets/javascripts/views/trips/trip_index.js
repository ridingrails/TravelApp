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

	join: function() {
		event.preventDefault();
    var tripId = $(event.currentTarget).attr('data-id');
		console.log(tripId);
		var userId = TravelApp.currentUser.get('id');
    var data = {
    	reservation: {}
    };

		data.reservation.attendee_id = userId;
		data.reservation.trip_id = tripId;
		alert('saving reservation');
		var reservation = new TravelApp.Models.Reservation(data);
    reservation.save({}, {
      success: function(resp) {
				console.log(TravelApp.currentUser);
				console.log(TravelApp.currentUser.session_token);
			  TravelApp.mainRouter.navigate('users/' + resp.id,
							 																{ trigger: true });
      },

      error: function(resp) {
        window.alert("failed")
      }
    });

	}
})