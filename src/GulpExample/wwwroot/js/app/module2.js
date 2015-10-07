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