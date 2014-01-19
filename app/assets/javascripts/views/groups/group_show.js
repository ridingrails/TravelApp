TravelApp.Views.GroupShow = Backbone.View.extend({

	initialize: function() {
	//     _.bindAll(this, 'detect_scroll');
	//     // bind to window
	//     $(window).scroll(this.detect_scroll);
	},

	events: {
	},

	template: JST["groups/profile"],

	render: function () {
		var renderedContent = this.template({ group: this.model });
		this.$el.html(renderedContent);
		// var groups = this.model.get('groups');
		// var groups = this.model.get('groups');
		// var interests = this.model.get('interests');
		// var renderedContent = this.template({ user: this.model });
		// this.$el.html(renderedContent);
		// var that = this;
		// groups.each(function(group) {
		// 	var view = new TravelApp.Views.GroupItem({ model: group });
		// 	    that.$('#groups').append(view.render().$el);
		// });
		// groups.each(function(group) {
		// 	var view = new TravelApp.Views.GroupItem({ model: group });
		// 	that.$('#groups').append(view.render().$el);
		// });
		// interests.each(function(interest) {
		// 	var view = new TravelApp.Views.InterestItem({ model: interest });
		// 	that.$('#interests').append(view.render().$el);
		// });
		return this;
	},

	renderSubView: function(view, selector) {
		alert('about to render sub view');
		selector.append(view.render().$el);
	}
})