TravelApp.Views.TripShow = Backbone.View.extend({

	initialize: function() {
	  var that = this;
		var dest = this.model.get('start_loc');
		this.latLng(dest, function () {
		});
	  this.listenTo(Backbone, "submit #new-excursion", this._installSideList);
	},

	events: {
		'click button.dest-search' : 'queryPlaces',
		'submit #new-excursion' : '_excursionsRender'
	},

	template: JST["trips/profile"],

	render: function () {
		console.log(this.model)
		var newStart = this._parseTime(this.model.get('start_date'));
		this.model.set('start_date', newStart);
		var newEnd = this._parseTime(this.model.get('end_date'));
		this.model.set('end_date', newEnd);
 		var destination = this.model.get('end_loc');
		var renderedContent = this.template({ trip: this.model });
		this.$el.html(renderedContent);
		this._installSideList();
		// $('div.excursion-panel').html(this._excursionsList);
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

	_installSideList: function() {
		alert('in side list');
		var sideListView = new TravelApp.Views.ExcursionSideList({
			trip: this.model
		});
		$('div.info-area-ul').html(sideListView.render().$el);
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
	    title: this.model.get('end_loc'),
			panControl: false
		});

  	google.maps.event.addListener(marker, 'click', function() {
	    map.setZoom(12);
	    map.setCenter(marker.getPosition());
	  });

		google.maps.event.addListener(marker, 'dragend', function(event) {
		  console.debug('final position is '+event.latLng.lat()+' / '+event.latLng.lng());
			var pos = mapOptions['center'];
			marker.setPosition(pos);
		});

		google.maps.event.addListener(marker, 'dragstart', function() {
      map.set('draggable', false );
    });

    google.maps.event.addListener(marker, 'dragend', function() {
      map.set('draggable', true );
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

	excursionView: function(loc) {
		var that = this;
	  var excursion = new TravelApp.Models.Excursion({ tripId: this.model.get('id') });
		var view = new TravelApp.Views.NewExcursion({ model: excursion, info: loc, trip: that.model });
		return view;
	},

	queryPlaces: function(event) {
		event.preventDefault();
		var target = $(event.currentTarget);
		var excursionView = this.excursionView;
		var the = this;
		var thisTrip = the.model;
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

		function createMarker(loc, context) {
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

			var infoWindow = new google.maps.InfoWindow( { content: '<div><p><strong>' + loc.name + '</strong></p>' + '<p>Rating: ' + loc.rating + '</p>' + '<p>Price level: ' + loc.price_level + '</p><p></p</div><div class="lat">' + markerLat + '</div><div class="lng">' + markerLng + '</div>'});

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
					var exView = context.excursionView(loc);
					// var excursion = new TravelApp.Models.Excursion();
					// var view = new TravelApp.Views.NewExcursion({ model: excursion, info: loc, trip: this.model });

					$('.info-area-ul').empty().prepend(exView.render().$el);
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
            createMarker(place, the);
	      }
	      } else {
	        alert('search query issue');
	      }
      });
		}
	}
})