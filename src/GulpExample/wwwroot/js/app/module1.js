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