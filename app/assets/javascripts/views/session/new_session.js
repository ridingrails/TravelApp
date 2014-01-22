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
    var session = new TravelApp.Models.Session(formData);
		alert('saving session');
    session.save({}, {
      success: function(resp) {
				// TravelApp.currentUser = new TravelApp.Models.User(resp);
				TravelApp.currentUser = resp.attributes;
				console.log(TravelApp.currentUser);
				console.log(TravelApp.currentUser.session_token);
		    $.cookie('session_token', TravelApp.currentUser.session_token);
				alert($.cookie('session_token'));
		    $.cookie('current_user', resp.id);
			  TravelApp.mainRouter.navigate('users/' + resp.id,
							 																{ trigger: true });
      },

      error: function(resp) {
        window.alert("failed")
      }
    });

  }
})
