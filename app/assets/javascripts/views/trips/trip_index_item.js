TravelApp.Views.TripIndexItem = Backbone.View.extend({

	initialize: function(options) {
		var tripItem = this.model;
	},

	events:  {
		'click img.item-image' : 'showTrip',
		'click button.remove' : 'destroyRes',
	  'click button.join' : 'createRes'
	},

	template: JST["trips/trip_index_item"],

	render: function () {
		console.log(this.model);
		var newStart = this._parseTime(this.model.get('start_date'));
		this.model.set('start_date', newStart);
		var newEnd = this._parseTime(this.model.get('end_date'));
		this.model.set('end_date', newEnd);

		var renderedContent = this.template({ trip: this.model });
		this.$el.html(renderedContent);
		console.log(this.model);
		return this;
	},

	_parseTime: function(time) {
		var year = time.slice(0,4);
		var month = this._mapMonths(time.slice(5,7));
		var day = time.slice(8,10);
		var hour =
		   parseInt(time.slice(11,13)) < 12 ? time.slice(11,13) + ":00 AM" : time.slice(11,13) % 12 + ":00 PM";
	  var res = day + " " + month + " " + year;
		return res;
	},

	_mapMonths: function(num) {
		var map = {
			"01":"January",
			"02":"February",
			"03":"March",
			"04":"April",
			"05":"May",
			"06":"June",
			"07":"July",
			"08":"August",
			"09":"September",
			"10":"October",
			"11":"November",
			"12":"December"
		}
		return map[num];
	},

	createRes: function(event) {
		alert('in create');
		event.preventDefault();
		var target = $(event.currentTarget);
		var that = this;
		console.log(TravelApp.currentUser);
		var tripId = $(event.currentTarget).attr('data-id');
		alert($(event.currentTarget).attr('data-id'));
		var currentId = TravelApp.currentUser;
		var reservation = new TravelApp.Models.Reservation({
			trip_id: tripId, attendee_id: currentId
		});
		console.log(reservation);
    reservation.save({
		  success: function(resp) {
				alert('created');
				that.changeButton(target);
		  },

		  error: function(resp) {
				alert('not created');
		  }
	 })
  },

	showTrip: function (event) {
		event.preventDefault();
		console.log($(event.currentTarget));
		var tripId = $(event.currentTarget).attr('data-id');
		TravelApp.mainRouter.navigate('trips/' + tripId, { trigger:true });
	},

	changeButton: function(target) {
		if (target.hasClass('join')) {
			target.removeClass('join');
			target.addClass('remove');
			target.text('Join');
		} else {
			target.removeClass('remove');
			target.addClass('join')
			target.text('Remove')
		}
	},

})