TravelApp.Views.NewGroup = Backbone.View.extend({

	events: {
		'submit #new_group_form': 'createGroup'
	},

	template: JST["groups/form"],

	render: function () {
		var renderedContent = this.template({ group: this.model });
		this.$el.html(renderedContent);
		return this;
	},

  encodeFile: function (event) {
       var that = this;
       var file = event.currentTarget.files[0];

       console.log(file);

       var reader = new FileReader();
       reader.onload = function(e) {
           console.log(e.target.result);
           that.model.set({ group_photo: e.target.result });
       }
       reader.onerror = function(stuff) {
           console.log("error", stuff)
           console.log (stuff.getMessage())
       }
       reader.readAsDataURL(file);
  },

	createGroup: function (event) {
		console.log("in new group fx")
		event.preventDefault();
		alert("in createGroup function");
		var formData = $(event.currentTarget).serializeJSON();
		console.log(formData);
		formData.group.creator_id = TravelApp.currentUser.get('id');
		console.log(formData);
		that.model.set(formData);
		console.log(that.model);
		that.model.save({}, {
			success: function (resp) {
				console.log(resp);
				TravelApp.mainRouter.navigate('groups/' + resp.get('id'), { trigger: true});
			},

			error: function (resp) {
				console.log("failed");
			}
		});
	}
});