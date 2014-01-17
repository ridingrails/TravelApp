TravelApp.Models.Session = Backbone.Model.extend({

  methodToURL: {
    'create': '/login',
    'delete': '/logout'
  },

  sync: function(method, model, options) {
    options = options || {};
    options.url = model.methodToURL[method.toLowerCase()];

    return Backbone.sync.apply(this, arguments);
  }
})