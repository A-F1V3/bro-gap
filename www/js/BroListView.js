var BroListView = function(service) {
	this.initialize = function() {
		this.$el = $('<div/>');

		var deferred = service.getFriends();

		deferred.done(function(friendList) {
			console.log(friendList);
			this.$el.html(this.template(friendList));
		});

		deferred.fail(function (xhr, status, error) {
			console.log(status + " : " + error);
		});
	};

	this.render = function() {
		this.$el.html(this.template({bros:[]}));
		return this;
	};

	this.initialize();
}