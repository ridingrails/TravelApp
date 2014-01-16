window.TravelApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		TravelApp.mainRouter = new TravelApp.Routers.MainRouter({ $rootEl: $('#content') });
		alert("hello");
		Backbone.history.start();
  }
};

$(document).ready(function(){
  TravelApp.initialize();
});
