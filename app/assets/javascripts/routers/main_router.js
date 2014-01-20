TravelApp.Routers.MainRouter = Backbone.Router.extend({

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this._installHeader();
	},

	routes: {
		"":"index",
		"session/new": "newSession",
    "users/new": "newUser",
	  "users/:id": "showUser",
		"trips/new": "newTrip",
		"trips/:id": "showTrip",
		"groups/:id": "showGroup",
		"login": "newSession",
		"logout": "signOut"
	},

	index: function () {
		var homeView = new TravelApp.Views.Home();
		this._swapView(homeView);
	},

  newUser: function() {
    if($.cookie('session_token')) {
      TravelApp.mainRouter.navigate('', {trigger: true});
    } else {
      var user = new TravelApp.Models.User();
      var newUserView = new TravelApp.Views.NewUser({ model: user });
      this._swapView(newUserView);
    }
  },

  newSession: function() {
    if($.cookie('session_token')) {
      TravelApp.mainRouter.navigate('', {trigger: true});
    } else {
      var user = new TravelApp.Models.User();
      var newSessionView = new TravelApp.Views.NewSession({ model: user });
      this._swapView(newSessionView);
    }
  },

  showUser: function (id) {
    var that = this;
    var user = new TravelApp.Models.User({ id: id });
    user.fetch({
      success: function () {
        var userProfile = new TravelApp.Views.UserProfile({
									model: user });
        that._swapView(userProfile);
				that._installHeader();
      }
    });
  },

  newTrip: function() {
    if(!$.cookie('session_token')) {
      TravelApp.mainRouter.navigate('', {trigger: true});
    } else {
      var trip = new TravelApp.Models.Trip();
      var newTripView = new TravelApp.Views.NewTrip({ model: trip });
      this._swapView(newTripView);
    }
  },

	showTrip: function(id) {
		var that = this;
		var trip = new TravelApp.Models.Trip({ id: id });
		trip.fetch({
			success: function() {
				console.log(trip.get('title'));
        var tripShow = new TravelApp.Views.TripShow({
									model: trip });
        that._swapView(tripShow);
				that._installHeader();
			}
		})
	},

	showGroup: function(id) {
		alert('in show group detail');
		var that = this;
		var group = new TravelApp.Models.Group({ id: id });
		group.fetch({
			success: function() {
        var groupShow = new TravelApp.Views.GroupShow({
									model: group });
        that._swapView(groupShow);
				that._installHeader();
			}
		})
	},

	signOut: function() {
		var that = this;
		var session = new TravelApp.Models.Session({
																session_token:
																$.cookie('session_token')
															});
		session.destroy({
			success: function() {
				$.removeCookie('session_token');
				var homeView = new TravelApp.Views.Home();
				that._swapView(homeView);
				that._installHeader();
			},

			error: function() {
				console.log('session not destroyed')
			}
		});
	},

	_installHeader: function() {
		var topNavbar = new TravelApp.Views.TopNavbar();
		$('#top_navbar').html(topNavbar.render().$el);
	},

	_swapView: function(newView) {
		this._currentView && this._currentView.remove();
		this._currentView = newView;
		this.$rootEl.html(newView.render().$el);
	},

	_checkSessionToken: function(user) {
		if (!user.get('session_token')) {
			var homeView = new TravelApp.Views.Home();
			this.navigate('', { trigger:true });
		}
	},

	_checkCurrentUser: function() {
    var user = new TravelApp.Models.User({ id: id });
		if (user.get('session_token') !== $.cookie('session_token')) {
			return false;
		}
		return true;
	}
});