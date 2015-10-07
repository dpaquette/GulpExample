var Sample;
(function (Sample) {
    var App = (function () {
        function App() {
            $("[data-action=submit]").on("click", function (event) {
                event.target.closest("form").submit();
            });
        }
        return App;
    })();
    Sample.App = App;
})(Sample || (Sample = {}));

var app = new Sample.App();
var Sample;
(function (Sample) {
    var Module1 = (function () {
        function Module1() {
            $("[data-action=submit]").on("click", function (event) {
                event.target.closest("form").submit();
            });
        }
        return Module1;
    })();
    Sample.Module1 = Module1;
})(Sample || (Sample = {}));

var module1 = new Sample.Module1();
var Sample;
(function (Sample) {
    var Module2 = (function () {
        function Module2() {
            $("[data-action=submit]").on("click", function (event) {
                event.target.closest("form").submit();
            });
        }
        return Module2;
    })();
    Sample.Module2 = Module2;
})(Sample || (Sample = {}));

var module1 = new Sample.Module2();