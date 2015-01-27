var BroService = function () {
	
	var TOKEN_KEY = "bro_token";
	// var API_ROOT = "https://api.brah.io/v1";
	var API_ROOT = "http://localhost:8080";

	var logged_in = false;
	var token = "";

	this.initialize = function () {
		var deferred = $.Deferred();

		var token = window.localStorage.getItem(TOKEN_KEY);
		if (token === null) {
			var logged_in = false;
		}

		deferred.resolve();
		return deferred.promise();
	};

	this.loggedIn = function () {
		return logged_in;
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
        	dataType: "text",
        	error: function (xhr, status, error) {
        		console.log(status + " : " + error);
        		deferred.reject();
        	},
        	success: function (data, status) {
        		console.log("Login success: " + data);
        		deferred.resolve();
        	}
		});

		return deferred;
	};
}