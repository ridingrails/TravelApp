TravelApp.Views.NewSession = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.model, "error", this.render);
	},

	events: {
		"submit #new_session_form": 'createSession'
	},

	template: JST["session/form"],

	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	},

  createSession: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
		alert(formData);
    var session = new TravelApp.Models.Session(formData);

    session.save({}, {
      success: function(resp) {
				window.alert(resp.toJSON());
				var user = new TravelApp.Models.User({
												id: resp.get('id')
											});
        window.alert(resp.get('id'));
		    $.cookie("session_token", resp.get('session_token'));
			  TravelApp.mainRouter.navigate('users/' + resp.get('id'),
							 																{ trigger: true });
      },

      error: function(resp) {
        window.alert("failed")
      }
    });

  }
})
