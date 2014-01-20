TravelApp.Views.TripShow = Backbone.View.extend({

	initialize: function() {
	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	  var that = this;
		var dest = this.model.get('end_loc');
		this.latLng(dest, function () {
			console.log("back in init " + that.model.get('lat'));
		  console.log("back in init " + that.model.get('lng'));
		});
	},

	events: {
	},

	template: JST["trips/profile"],

	render: function () {
		var newStart = this._parseTime(this.model.get('start_date'));
		this.model.set('start_date', newStart);
		var newEnd = this._parseTime(this.model.get('end_date'));
		this.model.set('end_date', newEnd);
		var destination = this.model.get('end_loc');
		alert(destination);
		var renderedContent = this.template({ trip: this.model });
		this.$el.html(renderedContent);
		return this;
		// var groups = this.model.get('groups');
		// var trips = this.model.get('trips');
		// var interests = this.model.get('interests');
		// var renderedContent = this.template({ user: this.model });
		// this.$el.html(renderedContent);
		// var that = this;
		// groups.each(function(group) {
		// 	var view = new TravelApp.Views.GroupItem({ model: group });
		// 	    that.$('#groups').append(view.render().$el);
		// });
		// trips.each(function(trip) {
		// 	var view = new TravelApp.Views.TripItem({ model: trip });
		// 	that.$('#trips').append(view.render().$el);
		// });
		// interests.each(function(interest) {
		// 	var view = new TravelApp.Views.InterestItem({ model: interest });
		// 	that.$('#interests').append(view.render().$el);
		// });
	},

	showTripDetail: function(event) {
		event.preventDefault();
		alert('in show trip');
		var dataId = $(event.currentTarget).attr('data-id');
		TravelApp.mainRouter.navigate( 'trips/' + dataId, { trigger:true });
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

	latLng: function(destination, callback) {
		var that = this;
		geo = new google.maps.Geocoder();
		alert('in latLng' + " " + "dest: " + destination);
		geo.geocode({
			'address': destination
		}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				alert("set lat lng");

			  that.model.set('lat', results[0].geometry.location.lat());
				that.model.set('lng', results[0].geometry.location.lng());
        that.buildMap();

					console.log('variable is ' + that.model.get('lat') + "," + that.model.get('lng'));
					console.log('variable should be ' + [results[0].geometry.location.lat(),
					results[0].geometry.location.lng()] );
					callback();
			} else {
				alert('not ok');
			}
		});
	},

	buildMap: function () {
		var latitude = this.model.get('lat');
		alert(latitude); //trip.escape('latLng')[0]; $('div.trip-details').attr('data-loc')[0];
		var longitude = this.model.get('lng');
		alert(longitude);		//trip.escape('latLng')[1]; $('div.trip-details').attr('data-loc')[1];
    var mapOptions = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 10
    };
		alert(mapOptions['center']);

    var map = new google.maps.Map($("#map-canvas")[0],
        mapOptions);

		var marker = new google.maps.Marker({
		    position: mapOptions['center'],
		    map: map,
		    title: this.model.get('end_loc')
		});
	}
})