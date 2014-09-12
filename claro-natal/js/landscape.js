(function(window, undefined) {
    'use strict';

    var Landscape = (function() {

        function init () {
            // Initialize Clouds animation
            window.addEventListener('shake', shakeHandler, false);

            window.OgvAd.Snowglobe.init();
            window.OgvAd.Builds.init();
            window.OgvAd.Snowglobe.snow();
        }

        function shakeHandler(){
            // Remove shake listener
            window.removeEventListener('shake', shakeHandler, false);
            // Initialize modals and icons
            window.OgvAd.Icons.init();
            // window.OgvAd.Icons.pulseoff();
            window.OgvAd.Modal.init();
            // Hide initial infos
            hideInfo();
            // Exhibit instructions
            showInstructions();
        }

        function showInstructions () {
            $s('.instructions').addClass('opacity11s', 2);
            $s('.skip').addClass('opacity11s', 2.5);
            $s('.skip').addEventListener('mousedown', showCTA);
        }

        function hideInstructions () {
            $s('.instructions').addClass('opacity01s', 0);
            $s('.skip').addClass('opacity01s', 0.2);
            $s('.skip').removeEventListener('mousedown', showCTA);
        }

        function hideInfo() {
            $s('.info').addClass('opacity01s');
            $s('.info').addClass('none', 1);
        }

        function showCTA () {
            // Hide icons
            window.OgvAd.Icons.hide(    );
            window.OgvAd.Icons.disable();
            // Hide instructions
            hideInstructions();
            // Stop snow globe
            window.OgvAd.Snowglobe.end();
            // Exhibit cta info
            $s('.cta').addClass('opacity11s', 1);
            $s('.cta-icone').addClass('opacity11s', 1.2);
            // register events
            registerCTAEvents();
        }

        function registerCTAEvents () {
            $s('.cta-icone').on('mousedown', function() {
                // CLICKTAG
                window.open("@@clicktag");

            });
        }

        return {
            init: init,
            shake: shakeHandler,
            showCTA: showCTA
        };

    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Landscape = Landscape;

}(window, undefined));
