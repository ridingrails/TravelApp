TravelApp.Views.TripItem = Backbone.View.extend({

	initialize: function(options) {
	},

	// events: {
	// 	'click #new_group': 'newGroup',
	// 	'click #new_trip': 'newTrip'
	// },

	events: {
		'click #content-item-main' : 'showTripDetail'
	},

	template: JST["trips/item"],

	render: function () {
		var newStart = this._parseTime(this.model.get('start_date'));
		this.model.set('start_date', newStart);
		var newEnd = this._parseTime(this.model.get('end_date'));
		this.model.set('end_date', newEnd);

		var renderedContent = this.template({ trip: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	_parseTime: function(time) {
		var year = time.slice(0,4);
		var month = this._mapMonths(time.slice(5,7));
		var day = time.slice(8,10);
		var hour =
		   parseInt(time.slice(11,13)) < 12 ? time.slice(11,13) + ":00 AM" : time.slice(11,13) % 12 + ":00 PM";
	  var res = day + " " + month + " " + year + " " + hour;
		return res;
	},

	showTripDetail: function(event) {
		event.preventDefault();
		alert('in show trip');
		var dataId = $(event.currentTarget).attr('data-id');
		TravelApp.mainRouter.navigate( 'trips/' + dataId, { trigger:true });
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
	}
})