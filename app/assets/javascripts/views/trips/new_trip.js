TravelApp.Views.NewTrip = Backbone.View.extend({

	initialize: function() {

	},

	events: {
	  "submit #new_trip_form": "saveTrip",
	  "change input[type=file]" : "encodeFile"
	},

	template: JST["trips/form"],

	render: function () {
		var renderedContent = this.template({ trip: this.model });
		this.$el.html(renderedContent);
		return this;
	},

  encodeFile: function (event) {
     var that = this;
     var file = event.currentTarget.files[0];

     console.log(file);

     var reader = new FileReader();
     reader.onload = function(e) {
         console.log(e.target.result);
         that.model.set({ trip_photo: e.target.result });
     }
     reader.onerror = function(stuff) {
         console.log("error", stuff);
         console.log(stuff.getMessage());
     }
     reader.readAsDataURL(file);
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

	excursionView: function(loc) {
		var that = this;
	  var excursion = new TravelApp.Models.Excursion();
		var view = new TravelApp.Views.NewExcursion({ model: excursion, info: loc, trip: that.model });
		return view;
	},

	saveTrip: function(event) {
		event.preventDefault();
		var that = this;
		var formData = $(event.currentTarget).serializeJSON();
		console.log(formData);
		console.log(TravelApp.currentUser);
		// formData.trip.planner_id = TravelApp.currentUser.get('id');
		console.log(formData);
		that.model.set(formData);
		console.log(that.model);
    // TravelApp.trips.add(trip, {
   //        success: function (attribute) {
   //            console.log("happy days!");
   //        },
   //    });
		that.model.save({}, {
			success: function (resp) {
				console.log(resp);
				TravelApp.mainRouter.navigate('trips/' + resp.attributes.id, { trigger:true });
			},

			error: function(resp) {
				alert(resp);
				//Add to validation div
				that.render();
			}
		});
	}
});