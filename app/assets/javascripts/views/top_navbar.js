TravelApp.Views.TopNavbar = Backbone.View.extend({
	// events: {
	//
	// },

	template: JST["layout/top_navbar"],

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
});