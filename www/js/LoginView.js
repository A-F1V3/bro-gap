var LoginView = function(service) {

	// Utility methods for disabling buttons and adding spinners
	var setCreating = function () {
		$("#sign_up").html("<span class=\"glyphicon glyphicon-refresh spinning\"></span>")
		$("#sign_up").attr("disabled", "disabled");
		$("#log_in").attr("disabled", "disabled");
	};

	var setSigningIn = function () {
		$("#log_in").html("<span class=\"glyphicon glyphicon-refresh spinning\"></span>")
		$("#log_in").attr("disabled", "disabled");
		$("#sign_up").attr("disabled", "disabled");
	};

	var resetButtons = function () {
		$("#sign_up").html("Create Account");
		$("#log_in").html("Sign In");

		$("#sign_up").removeAttr("disabled");
		$("#log_in").removeAttr("disabled");
	};

	var showError = function (title, message) {
		console.log("Show errorModal");
		console.log($("#errorModal"));
		$("#errorModalTitle").html(title);
		$("#errorModalBody").html(message);
		$("#errorModal").modal();
	};

	this.initialize = function() {
		this.$el = $('<div/>');

		$('body').off('click', '#sign_up').on("click", "#sign_up", function() {
			setCreating();

			// TODO: Validations
			var username = $('#username').val();
			var password = $('#password').val();

			console.log("sign_up - " + username + " : " + password);

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

			createUserPromise.fail(function(jqXHR, data, status) {
				console.log("Create user error: " + status);
				console.log(data);

				var errMsg = "";
				if (jqXHR.status === 0) {
					errMsg = "<p>Couldn't connect!</p><p>Check your connection and try again</p>";
				}
				showError("Create User Error", errMsg);
				
				setTimeout(function() {
					resetButtons();
				}, 1000);
			});

			return false;
		});

		$('body').off('click', '#log_in').on("click", "#log_in", function() {
			setSigningIn();
			console.log("Signing in");

			var username = $('#username').val();
			var password = $('#password').val();

			var loginPromise = service.login(username, password);

			loginPromise.done(function(data) {
				router.load("/bros");
			});

			loginPromise.fail(function(jqXHR, data, status) {
				var errMsg = "";
				if (jqXHR) {
					errMsg = "<p>Couldn't connect!</p><p>Check your connection and try again</p>";
				}
				showError("Login Failed", errMsg);
				setTimeout(function() {
					resetButtons();
					console.log("Login failed");
				}, 1000);
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