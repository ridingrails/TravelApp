window.TravelApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		TravelApp.mainRouter = new TravelApp.Routers.MainRouter({ $rootEl: $('#content') });
    alert('Hello from Backbone!');
  }
};

$(document).ready(function(){
  TravelApp.initialize();
});
