var BroListView = function(service) {

	this.initialize = function() {
		var curView = this;
		this.$el = $('<div/>');
		
		$('body').off("click", "#add_friend").on("click", "#add_friend", function() {
			var friend_name = $('#friend_name').val();
			$('#friend_name').val("");

			service.addFriend(friend_name).done(function() {
				alert("Friend added");
				$("#friend_list").append("<li>" + friend_name + "</li>");
			});

			return false;
		});

		$('body').off("click", ".send_bro").on("click", ".send_bro", function(){
			var friend_name = $(this).data('friend');
			alert("Send bro to friend: " + friend_name);
			service.sendBro(friend_name);
		});

		$('body').off('click', '#logout').on('click', "#logout", function() {
			service.logout();
			router.load("/login");
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