window.TravelApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		TravelApp.mainRouter = new TravelApp.Routers.MainRouter({ $rootEl: $('#content') });
		TravelApp.mainRouter._installHeader();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  TravelApp.initialize();
});
