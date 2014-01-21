TravelApp.Views.NewTrip = Backbone.View.extend({

	events: {
		'click .dest-search-submit': 'queryPlaces',
	  'click .add-events': 'createEvents'
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
	    var str = JSON.stringify(response.result);
	    $('#search-container').html('<pre>' + str + '</pre>');
			target.attr('disabled',false);
	  });
	},

	// 	if (marker.map.getBounds() - event.latLng.lat())
	// },

	queryPlaces: function(event) {
		event.preventDefault();
		var target = $(event.currentTarget);
		var the = this;
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

	  service = new google.maps.places.PlacesService(map);

		function createMarker(loc) {
			console.log(loc);

			var that = this;
			var markerLat = loc.geometry.location.lat();
      var markerLng = loc.geometry.location.lng();
			var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(markerLat, markerLng),
		    map: map,
		    title: loc.name,
				draggable: true
			});

			var infoWindow = new google.maps.InfoWindow( { content: '<div><p><strong>' + loc.name + '</strong></p>' + '<p>Rating: ' + loc.rating + '</p>' + '<p>Price level: ' + loc.price_level + '</p><img src="' + loc.icon + '"></div>'});

			google.maps.event.addListener(marker, 'drag', function(event) {
			  // console.debug('new position is '+event.latLng.lat()+' / '+event.latLng.lng());
			});

			google.maps.event.addListener(marker, 'dragend', function(event) {
			  // console.debug('final position is '+event.latLng.lat()+' / '+event.latLng.lng());
				var pos = new google.maps.LatLng(markerLat, markerLng)
				marker.setPosition(pos);
				var coords = [event.latLng.lat(), event.latLng.lng()];
				var mapBounds = map.getBounds();
				var ne = mapBounds.getNorthEast().lng();
				var sw = mapBounds.getSouthWest().lng();

				if (event.latLng.lng() > ne) {
					$('.info-area-ul').append('<li>' + infoWindow['content'] + '</li>');
				} else {
					alert('not in main clause');
				}
			});

	  	google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
		    map.setCenter(marker.getPosition());
		  });

			google.maps.event.addListener(marker, 'dragstart', function(){
			    map.set('draggable', false);
			});
			google.maps.event.addListener(marker, 'dragend', function(){
			    map.set('draggable', true);
			});

		}

		if (!$('input[name=dest-search]').val()) {
			alert('please enter a value');
		} else {

		  var request = {
		    location: mapOptions['center'],
		    radius: '10000',
		    query: queryString
		  };

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
      });
		}
	},

	createEvents: function(event) {
		event.preventDefault();
		if ($('#trip_destination').val()) {
			this.latLng($('#trip_destination').val(), function () {
				$('div#trip-events').addClass('vis-true');
			  $('div#trip-events').fadeIn( "slow", function() {
			 	 	alert('in inner fx');
			  });
			});
		} else {
			alert('please enter a value');
		}
	}
});