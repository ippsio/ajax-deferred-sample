$(function () {
    "use strict";

    // Defeered-extended $.ajax
    var dajax = function (opt) {
        var $ajax = $.ajax(opt);
        var defer = new $.Deferred();
        $ajax.done(function (data, textStatus, jqXHR) {
            console.log('status_code=' + jqXHR.status + ' ' + textStatus + ' ' + this.type + ' ' + this.url);
            defer.resolveWith(this, arguments);
        });
        $ajax.fail(function (jqXHR, textStatus, errorThrown) {
            console.log('status_code=' + jqXHR.status + ' ' + textStatus + ' ' + this.type + ' ' + this.url + ' ' + errorThrown);
            defer.resolveWith(this, arguments);
        });
        return $.extend({}, $ajax, defer.promise());
    };

    $('#b1').on('click', function () {
        var defeereds = [];

        var result1;
        defeereds.push(dajax({
            type: "get", url: "./hoge.json",
        }).done(function (res, status, jqXHR) {
            if (jqXHR.status === 200) {
                result1 = res;
            }
        }));

        var result2;
        defeereds.push(dajax({
            type: "get", url: "./hoge.json2222222222222",
        }).done(function (res, status, jqXHR) {
            if (jqXHR.status === 200) {
                result2 = res;
            }
        }));

        // Wait all ajax response using $.when 
        $.when.apply(null, defeereds).done(function () {
            console.log('result1 >> ' + JSON.stringify(result1));
            console.log('result2 >> ' + JSON.stringify(result2));
            console.log("DONE!");
        });
    });
});