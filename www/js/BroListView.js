var BroListView = function(service) {

	this.initialize = function() {
		var curView = this;
		this.$el = $('<div/>');
		
		$('body').on("click", "#add_friend", function() {
			var friend_name = $('#friend_name').val();
			$('#friend_name').val("");

			var deferred = service.addFriend(friend_name);
			deferred.done(function() {
				$("#friend_list").append("<li>" + friend_name + "</li>");
			});

			return false;
		});

		var deferred = service.getFriends();

		deferred.done(function(friendList) {
			console.log(friendList);
			var friendListHtml = curView.template(friendList);
			curView.$el.html(friendListHtml);
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