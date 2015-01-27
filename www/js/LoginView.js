var LoginView = function(service) {
	this.initialize = function() {
		this.$el = $('<div/>');

		$('body').on("click", "#sign_up", function() {
			alert("Sign up");
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

		$('body').on("click", "#log_in", function() {
			//alert("Sign in");
			console.log("Signing in");

			var username = $('#username').val();
			var password = $('#password').val();

			var loginPromise = service.login(username, password);

			loginPromise.done(function(data) {
				router.load("/bros");
			});

			loginPromise.fail(function(err) {
				alert("Login failed");
				console.log("Login failed");
			});

			return false;
		});
	};

	this.render = function() {
		this.$el.html(this.template());
		return this;
	};

	this.initialize();
}