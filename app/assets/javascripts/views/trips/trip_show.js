TravelApp.Views.TripShow = Backbone.View.extend({

	initialize: function() {
	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	  var that = this;
		var dest = this.model.get('end_loc');
		this.latLng(dest, function () {
		});
	},

	events: {
		"click button.dest-search": function(e) {
        this.queryPlaces(e);
        // this.gapiInit(e);
		}
	},

	template: JST["trips/profile"],

	render: function () {
		var newStart = this._parseTime(this.model.get('start_date'));
		this.model.set('start_date', newStart);
		var newEnd = this._parseTime(this.model.get('end_date'));
		this.model.set('end_date', newEnd);
		var destination = this.model.get('end_loc');
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
		geo.geocode({
			'address': destination
		}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

			  that.model.set('lat', results[0].geometry.location.lat());
				that.model.set('lng', results[0].geometry.location.lng());
        that.buildMap();

				callback();
			} else {
				alert('not ok');
				that.render();
			}
		});
	},

	buildMap: function () {
		var latitude = this.model.get('lat');
  //trip.escape('latLng')[0]; $('div.trip-details').attr('data-loc')[0];
		var longitude = this.model.get('lng');
	//trip.escape('latLng')[1]; $('div.trip-details').attr('data-loc')[1];
    var mapOptions = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 10
    };

    var map = new google.maps.Map($("#map-canvas")[0],
      mapOptions);

		var marker = new google.maps.Marker({
	    position: mapOptions['center'],
	    map: map,
	    title: this.model.get('end_loc')
		});

  	google.maps.event.addListener(marker, 'click', function() {
	    map.setZoom(12);
	    map.setCenter(marker.getPosition());
	  });

		var transitLayer = new google.maps.TransitLayer();
		transitLayer.setMap(map);

		var input = document.getElementById('dest-search');

		var options = {
		  types: ['establishment']
		};

	  autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.bindTo('bounds', map);

	},

	gapiInit: function (event) {
		var that = this;
	  googleApiClientReady(function () {
	  	that.queryVids();
	  });
	},

	queryVids: function() {
		alert('in search outer');
		// Search for a specified string.
		var target = $(event.currentTarget);
		target.attr('disabled',true);
		var queryString = $('input[name=dest-search]').val();
	  var request = gapi.client.youtube.search.list({
	    q: queryString,
	    part: 'snippet'
	  });

	  request.execute(function(response) {
			alert('in search inner');
	    var str = JSON.stringify(response.result);
	    $('#search-container').html('<pre>' + str + '</pre>');
			target.attr('disabled',false);
	  });
	},

	queryPlaces: function(event) {
		event.preventDefault();
		var target = $(event.currentTarget);
		target.attr('disabled',true);
		var that = this;
		var latitude = this.model.get('lat');
  //trip.escape('latLng')[0]; $('div.trip-details').attr('data-loc')[0];
		var longitude = this.model.get('lng');
	//trip.escape('latLng')[1]; $('div.trip-details').attr('data-loc')[1];
    var mapOptions = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 10
    };

    var map = new google.maps.Map($("#map-canvas")[0],
      mapOptions);

    var queryString = $('input[name=dest-search]').val();


		function createMarker(loc) {
			var that = this;
			var markerLat = loc.geometry.location.lat();
      var markerLng = loc.geometry.location.lng();
			var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(markerLat, markerLng),
		    map: map,
		    title: loc.name
			});

	  	google.maps.event.addListener(marker, 'click', function() {

		    map.setCenter(marker.getPosition());
		  });

		}

		if (!$('input[name=dest-search]').val()) {
			alert('please enter a value');
		} else {

		  var request = {
		    location: mapOptions['center'],
		    radius: '2000',
		    query: queryString
		  };

		  service = new google.maps.places.PlacesService(map);
		  service.textSearch(request, function(results, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (var i = 0; i < results.length; i++) {
			      var place = results[i];
						console.log(place);
			      createMarker(place);
			    }
			  } else {
					alert('search query issue');
			  }
				target.attr('disabled', false);
		  });
		}
	}
})