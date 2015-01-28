var BroService = function () {
	
	var TOKEN_KEY = "bro_token";
	// var API_ROOT = "https://api.brah.io/v1";
	var API_ROOT = "http://localhost:8080";

	this.logged_in = false;
	this.token = "";

	this.initialize = function () {
		var deferred = $.Deferred();

		var cur_token = window.localStorage.getItem(TOKEN_KEY);
		if (cur_token === null) {
			this.logged_in = false;
		} else {
			this.logged_in = true;
			this.token = cur_token;
		}

		deferred.resolve();
		return deferred.promise();
	};

	this.loggedIn = function () {
		return this.logged_in;
	};

	this.createUser = function (username, password) {
		var user_details = {
			username: username,
			password: password
		};

		return $.ajax({
			type: "POST",
        	url: API_ROOT + "/sign_up",
        	data: JSON.stringify(user_details),
        	contentType: "application/json; charset=utf-8",
        	dataType: "json"
		});
	};

	this.login = function (username, password) {
		var deferred = $.Deferred();
		var device_platform = device.platform;
		var device_id = device.uuid;

		alert(device_platform + " : " + device_id);

		var user_details = {
			username: username,
			password: password,
			device_id: device_id,
			device_type: device_platform
		};

		$.ajax({
			type: "POST",
        	url: API_ROOT + "/sign_in",
        	data: JSON.stringify(user_details),
        	contentType: "application/json; charset=utf-8",
        	dataType: "json",
        	error: function (xhr, status, error) {
        		console.log(status + " : " + error);
        		deferred.reject();
        	},
        	success: function (data, status) {
        		console.log("Login success: " + data["token"]);
        		this.token = data["token"];
        		this.logged_in = true;
        		localStorage.setItem(TOKEN_KEY, this.token);

        		deferred.resolve();
        	}
		});

		return deferred;
	};

	this.getFriends = function() {
		console.log("Using token: " + this.token);
		return $.ajax({
			type: "GET",
			url: API_ROOT + "/friends",
			dataType: "json",
			headers: {"X-Bro-Token": this.token}
		});
	};

	this.addFriend = function(username) {
		return $.ajax({
			type: "POST",
			url: API_ROOT + "/add_friend",
			data: JSON.stringify({"username": username}),
			headers: {"X-Bro-Token": this.token}
		});
	};
}

