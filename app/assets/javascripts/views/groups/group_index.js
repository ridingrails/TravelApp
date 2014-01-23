TravelApp.Views.GroupIndex = Backbone.View.extend({
	template: JST["groups/group_index"],

	events: {
		'click .join': 'join'
	},

	render: function() {
		var renderedContent = this.template({ groups: this.collection })
		this.$el.html(renderedContent);
		return this;
	},

	join: function(event) {
		event.preventDefault();
    var groupId = $(event.currentTarget).attr('data-id');
		var userId = TravelApp.currentUser.get('id');
    var data = {
    	membership: {}
    };

		data.membership.member_id = userId;
		data.membership.group_id = groupId;
		alert('saving membership');
		var membership = new TravelApp.Models.Membership(data);
    membership.save({}, {
      success: function(resp) {
				console.log(TravelApp.currentUser);
				console.log(TravelApp.currentUser.session_token);
			  TravelApp.mainRouter.navigate('users/' + resp.id,
							 																{ trigger: true });
      },

      error: function(resp) {
        window.alert("failed")
      }
    });
	}
})