TravelApp.Views.GroupItem = Backbone.View.extend({

	initialize: function() {

	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	// },
  },

	events: {
		'click #content-item-main' : 'showGroupDetail',
    'click .join' : 'join'
	},

	template: JST["groups/item"],

	showGroupDetail: function(event) {
		event.preventDefault();
		alert('in show group');
		var dataId = $(event.currentTarget).attr('data-id');
		TravelApp.mainRouter.navigate( 'groups/' + dataId, { trigger:true });
	},

	join: function(event) {
		event.preventDefault();
    var groupId = this.model.get('id');
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
	},


	render: function () {
		var renderedContent = this.template({ group: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})