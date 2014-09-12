(function(window, document, undefined) {
    'use strict';

    var Cambio = (function() {

        var YQLRequest = function YQLRequest(queryString, callback) {
                var url = "http://query.yahooapis.com/v1/public/yql?q=" + queryString + "&format=json&callback=?";

                // your ajax request here
                $.getJSON(url, function(data) {
                        if (data.query) {
                            callback(data.query.results.row.rate);
                        } else {
                            callback(JSON.parse(data).query.results.row.rate);
                        };
                    });

            },
            getExchange = function getExchange(from, to, callback) {
                var q = escape("select rate,name from csv where url='http://download.finance.yahoo.com/d/quotes?s=" + from + to + "%3DX&f=l1n' and columns='rate,name'");

                YQLRequest(q, function(rate) {
                    callback(rate);
                });
            },
            getCurrencySymbol = function getCurrencySymbol(currency) {
                var symbol;
                switch (currency) {
                    case 'BRL':
                        symbol = 'R$ ';
                        break;
                    case 'USD':
                        symbol = 'US$ ';
                        break;
                    case 'GBP':
                        symbol = "£ ";
                        break;
                    case 'EUR':
                        symbol = '€ ';
                        break;
                }

                return symbol;
            },
            convertRate = function convertRate(from, to, value, callback) {
                getExchange(from, to, function(rate) {
                    var calc = ((value == 0 ? 1 : value) * rate).toFixed(2),
                        symbol = getCurrencySymbol(to);
                    callback(calc, symbol);
                });
            };

        return {
            getExchange: getExchange,
            convertRate: convertRate
        }
    }());

    window.Cambio = Cambio;
}(window, document, undefined));
