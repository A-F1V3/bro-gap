// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());

    BroListView.prototype.bro_partial = Handlebars.compile($("#bro-partial").html());
    Handlebars.registerPartial('bro', BroListView.prototype.bro_partial);
    BroListView.prototype.template = Handlebars.compile($("#bros-tpl").html());

    var service = new BroService();

    service.initialize().done(function () {
        router.addRoute('', function() {
            $('body').html(new HomeView(service).render().$el);
        });

        router.addRoute('/login', function() {
            $('body').html(new LoginView(service).render().$el);
        });

        router.addRoute('/bros', function() {
            $('body').html(new BroListView(service).render().$el);
        });

        router.start();
    });

    var pushTokenHandler = function(result) {
        service.setPushToken(result);
    }

    var pushErrorHandler = function(error) {
        navigator.notification.alert("Please enable push notifications to experience Bro", null, "Push It!");
    }

    /* --------------------------------- Event Registration -------------------------------- */
    
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
        var pushNotification = window.plugins.pushNotification;

        if ((device.platform == 'android') || (device.platform == 'Android')) {
            // TODO: Get an android sender_id
            /*
            pushNotification.register(
                successHandler,
                errorHandler,
                {
                    "senderID": "replace_with_sender_id",
                    "ecb": "onNotification"
                }
            );
            */
        } else {
            pushNotification.register(
                pushTokenHandler,
                pushErrorHandler,
                {
                    "badge":"true",
                    "sound":"true",
                    "alert":"true",
                    "ecb":"onNotificationAPN"
                }
            );
        }
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */

}());

