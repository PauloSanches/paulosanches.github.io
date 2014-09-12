(function(window, undefined) {
    'use strict';
    var Main = (function() {
        var  mql = window.matchMedia("(orientation: portrait)");

        return {
            init: function() {
                if (mql.matches) {
                    window.OgvAd.Portrait.init();
                }else {
                    window.OgvAd.Landscape.init();
                }
            }
        };

    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Main = Main;

}(window, undefined));
