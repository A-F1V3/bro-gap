var EmployeeListView = function () {

    var employees;

    this.initialize = function() {
        this.$el = $('<div id="employeeContainer"/>');
        $('body').on('touchstart', 'li', function() {
            console.log("clicky");
            window.alert("Clicked employee " + this.id);
        });
        console.log("init");
        alert("init");
        this.render();
    };

    this.setEmployees = function(list) {
        employees = list;
        console.log("updating employees");
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template(employees));
        return this;
    };

    this.initialize();
}
