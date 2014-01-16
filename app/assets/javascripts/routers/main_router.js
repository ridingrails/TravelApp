TravelApp.Routers.MainRouter = Backbone.Router.extend({

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	routes: {
		"":"index",
		"session/new": "newSession",
    "users/new": "newUser",
		"login": "newSession",
		"logout": "newSession",
		"users/:id": "showUser",
		"feeds/:id": "showFeed"
	},

	index: function () {
		var homeView = new TravelApp.Views.Home();
		this._swapView(homeView);
	},

  newUser: function() {
    if($.cookie('session_token')) {
      TravelApp.feedRouter.navigate('', {trigger: true});
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
    var user = new TravelApp.Models.User();
    user.id = id
    user.fetch({
      success: function () {
        var userProfile = new TravelApp.Views.UserProfile({ model: user });
        that._swapView(userProfile);
      }
    });
  },

  showFeed: function (id) {
    var that = this;
    var feedModel = new TravelApp.Models.Feed();
    feedModel.id = id
    feedModel.fetch({
      success: function () {
        var feedView = new TravelApp.Views.FeedView({ model: feedModel });
        that._swapView(feedView);
      }
    });
  },

	_swapView: function (newView) {
		this._currentView && this._currentView.remove();
		this._currentView = newView;
		this.$rootEl.html(newView.render().$el);
	}
});