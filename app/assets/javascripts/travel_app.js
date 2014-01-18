window.TravelApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		TravelApp.mainRouter = new TravelApp.Routers.MainRouter({ $rootEl: $('#content') });
		TravelApp.mainRouter._installHeader();
		TravelApp.currentUser = new TravelApp.Models.User({ session_token: $.cookie('session_token') }) || null;
		Backbone.history.start();
  }
};

$(document).ready(function(){
  TravelApp.initialize();
});
