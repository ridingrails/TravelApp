TravelApp.Routers.MainRouter = Backbone.Router.extend({

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	routes: {
		"":"index",
		"session/new": "newSession",
    "users/new": "newUser",
	  "users/:id": "showUser",
		"login": "newSession",
		"logout": "newSession"
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

	_swapView: function (newView) {
		this._currentView && this._currentView.remove();
		this._currentView = newView;
		this.$rootEl.html(newView.render().$el);
	}
});