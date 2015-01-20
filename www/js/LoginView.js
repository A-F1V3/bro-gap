var LoginView = function(service) {
	this.initialize = function() {
		this.$el = $('<div/>');
		$('body').on("click", "#sign_up", function() {
			// TODO: Validations
			var username = $('#username').val();
			var password = $('#password').val();

			console.log("Creating new user");
			var createUserPromise = service.createUser(username, password);

			createUserPromise.done(function(data) {
				console.log("Logging in");
				var loginPromise = service.login(username, password);
				loginPromise.done(function() {
					router.load("/bros");
				});
				loginPromise.fail(function () {
					alert("Problem logging in");
				});
			});

			createUserPromise.fail(function(data, status) {
				alert("Problem creating user");
				console.log("" + data + ": " + status);
			});
			console.log("sign_up - " + username + " : " + password);

			return false;
		});
	};

	this.render = function() {
		this.$el.html(this.template());
		return this;
	};

	this.initialize();
}