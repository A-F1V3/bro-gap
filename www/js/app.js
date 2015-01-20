// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());
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

    /* --------------------------------- Event Registration -------------------------------- */
    
    document.addEventListener('deviceready', function () {
      FastClick.attach(document.body);
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */

}());