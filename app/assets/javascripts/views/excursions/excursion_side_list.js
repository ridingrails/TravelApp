TravelApp.Views.ExcursionSideList = Backbone.View.extend({

	initialize: function(options) {
		this.trip = options.trip;
		this.excursions = this.trip.attributes.excursions
	},

	template: JST["excursions/side_list"],

	render: function() {
		alert('making dates');
		var that = this;
		this.excursions.each(function(excursion) {
			console.log(excursion.get('start'));
			var newStart = that._parseTime(excursion.get('start'));
			excursion.set('start', newStart);
			var newEnd = that._parseTime(excursion.get('end'));
			excursion.set('end', newEnd);
		});
		var renderedContent = that.template({ excursions: that.excursions })
		that.$el.html(renderedContent);
		return that;

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

	_parseTime: function(time) {
		var year = time.slice(0,4);
		var month = this._mapMonths(time.slice(5,7));
		var day = time.slice(8,10);
		var hour =
		   parseInt(time.slice(11,13)) < 12 ? time.slice(11,13) + ":00 AM" : time.slice(11,13) % 12 + ":00 PM";
	  var res = day + " " + month + " " + year;
		return res;
	}

})


// render: function () {
// 	console.log(this.model)
// 	var newStart = this._parseTime(this.model.get('start_date'));
// 	this.model.set('start_date', newStart);
// 	var newEnd = this._parseTime(this.model.get('end_date'));
// 	this.model.set('end_date', newEnd);
// 	var destination = this.model.get('end_loc');
// 	var renderedContent = this.template({ trip: this.model });
// 	this.$el.html(renderedContent);
// 	this._installSideList();
// 	// $('div.excursion-panel').html(this._excursionsList);
// 	return this;
// },


