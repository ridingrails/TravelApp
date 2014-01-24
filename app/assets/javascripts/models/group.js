TravelApp.Models.Group = Backbone.Model.extend({
	parse: function(data) {
		var members = data.members;
		data.members = new TravelApp.Collections.Groups(members);
		return data;
	},

	initialize: function(options) {
	},


	toJSON: function() {
		var data = _.clone(this.attributes);
		var photo = data.group_photo;
		data.group.group_photo = photo;
		delete data.group_photo;
		return data;
	},

	urlRoot: "/groups"
})