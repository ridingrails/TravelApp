TravelApp.Routers.MainRouter = Backbone.Router.extend({

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
		this._installHeader;
	},

	routes: {
		"":"index",
		"session/new": "newSession",
    "users/new": "newUser",
	  "users/:id": "showUser",
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
        var userProfile = new TravelApp.Views.UserProfile({ model: user });
        that._swapView(userProfile);
      }
    });
  },

	signOut: function(event) {
		event.preventDefault();
		var that = this;
		var session = new TravelApp.Models.Session({
																session_token:
																$.cookie('session_token')
															});
			debugger
		session.destroy({
			success: function() {
				$.removeCookie('session_token');
				var homeView = new TravelApp.Views.Home();
				that._swapView(homeView);
			},

			error: function() {
				console.log('session not destroyed')
			}
		});
	},

	_installHeader: function () {
		var topNavbar = new TravelApp.Views.TopNavbar();
		$('#top_navbar').html(topNavbar.render().$el);
	},

	_swapView: function (newView) {
		this._currentView && this._currentView.remove();
		this._currentView = newView;
		this.$rootEl.html(newView.render().$el);
	}
});