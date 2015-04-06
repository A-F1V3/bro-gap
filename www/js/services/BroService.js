var BroService = function () {
	
	alert("New broservice created");

	var TOKEN_KEY = "bro_token";
	var PUSH_KEY = "push_token";
	// var API_ROOT = "https://api.brah.io/v1";
	var API_ROOT = "http://192.168.1.241:8080";

	this.logged_in = false;
	this.token = "";
	this.push_token = "";

	this.initialize = function () {
		alert("Service initializing");
		var deferred = $.Deferred();

		var cur_token = window.localStorage.getItem(TOKEN_KEY);
		if (cur_token === null) {
			this.logged_in = false;
		} else {
			this.logged_in = true;
			this.token = cur_token;
		}

		var push_token = window.localStorage.getItem(PUSH_KEY);
		if (push_token != null) {
			this.push_token = push_token;
		}

		deferred.resolve();
		return deferred.promise();
	};

	this.setPushToken = function(token) {
		window.localStorage.setItem(PUSH_KEY, token);
		this.push_token = token;
	}

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

	this.loginSuccess = function(data, status) {
		this.token = data["token"];
		this.logged_in = true;
		localStorage.setItem(TOKEN_KEY, this.token);
	};

	this.login = function (username, password) {
		var deferred = $.Deferred();
		var device_platform = device.platform;
		var device_id = device.uuid;

		alert("Login called: " + device_platform + " : " + device_id);

		var user_details = {
			username: username,
			password: password,
			device_id: device_id,
			device_type: device_platform,
			push_token: this.push_token
		};

		var success_callback = function (data, status) {
    		console.log(this);
    		this.loginSuccess(data, status);
    		alert("Login success: " + data["token"]);
    		deferred.resolve();
    	};

		$.ajax({
			context: this,
			type: "POST",
        	url: API_ROOT + "/sign_in",
        	data: JSON.stringify(user_details),
        	contentType: "application/json; charset=utf-8",
        	dataType: "json",
        	error: function (xhr, status, error) {
        		console.log(status + " : " + error);
        		deferred.reject();
        	},
        	success: success_callback
		});

		return deferred;
	};

	this.getFriends = function() {
		alert(this);
		alert("Friend list with token: " + this.token);
		console.log("Using token: " + this.token);
		return $.ajax({
			type: "GET",
			url: API_ROOT + "/friends",
			dataType: "json",
			headers: {"X-Bro-Token": this.token}
		});
	};

	this.addFriend = function(username) {
		alert("Friend request with token: " + this.token);
		return $.ajax({
			type: "POST",
			url: API_ROOT + "/add_friend",
			data: JSON.stringify({"username": username}),
			headers: {"X-Bro-Token": this.token}
		});
	};

	this.sendBro = function(username) {
		return $.ajax({
			type: "POST",
			url: API_ROOT + "/bro",
			data: JSON.stringify({"username": username}),
			headers: {"X-Bro-Token": this.token}
		});
	};

	this.logout = function() {
		this.logged_in = false;
		window.localStorage.setItem(TOKEN_KEY, "");
	};
}

