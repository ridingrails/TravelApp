TravelApp.Views.GroupItem = Backbone.View.extend({

	initialize: function() {

	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	// },
  },

	events: {
		'click #content-item-main' : 'showGroupDetail'
	},

	template: JST["groups/item"],

	showGroupDetail: function(event) {
		event.preventDefault();
		alert('in show group');
		var dataId = $(event.currentTarget).attr('data-id');
		TravelApp.mainRouter.navigate( 'groups/' + dataId, { trigger:true });
	},

	render: function () {
		var renderedContent = this.template({ group: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})