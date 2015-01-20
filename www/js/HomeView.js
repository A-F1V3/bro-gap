var HomeView = function (service) {

	var checkLogin = new function() {
		if (service.loggedIn()) {
			console.log("redirecting to bros");
			router.load("/bros");
		} else {
			console.log("redirecting to login");
			router.load("/login");
		}
	};

	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		window.setTimeout(checkLogin, 0);
        this.$el = $('<div/>');
        this.render();
	};

	this.render = function () {
		this.$el.html(this.template());
		return this;
	};

	this.initialize();
}