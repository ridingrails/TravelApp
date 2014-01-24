TravelApp.Views.GroupIndexItem = Backbone.View.extend({

	initialize: function(options) {
		var groupItem = this.model;
		console.log(this.model.get('excursions'));
	},

	events:  {
		'click button.remove' : 'destroyRes',
	  'click button.join' : 'createRes'
	},

	template: JST["groups/group_index_item"],

	render: function () {
		var renderedContent = this.template({ group: this.model });
		this.$el.html(renderedContent);
		return this;
	},

	createRes: function(event) {
		alert('in create');
		event.preventDefault();
		var target = $(event.currentTarget);
		var that = this;
		console.log(TravelApp.currentUser);
		var groupId = $(event.currentTarget).attr('data-id');
		alert($(event.currentTarget).attr('data-id'));
		var currentId = TravelApp.currentUser.get('id');
		var membership = new TravelApp.Models.Membership({
			group_id: groupId, member_id: currentId
		});
		console.log(membership);
    membership.save({
		  success: function(resp) {
				alert('created');
				that.changeButton(target);
		  },

		  error: function(resp) {
				alert('not created');
		  }
	 })
  },

	changeButton: function(target) {
		if (target.hasClass('join')) {
			target.removeClass('join');
			target.addClass('remove');
			target.text('Join');
		} else {
			target.removeClass('remove');
			target.addClass('join')
			target.text('Remove')
		}
	},

})