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