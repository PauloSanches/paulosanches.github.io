(function(window, undefined) {
    'use strict';

    var BuildsCanvas = (function() {

        var canvas, ctx,
            prefix = 'img/landscape/house/house',
            sufix = '.png',
            variables = ['A', 'B', 'C', 'D', 'E'],
            widths = [0,211, 443, 642, 831],
            amount = 4,
            indice = 1,
            img, j,
            fps = 3,
            now, delta,
            then = Date.now(),
            interval = 1000 / fps,
            cache = [];

        function init() {
            canvas = document.querySelector('#buildsCanvas');
            ctx = canvas.getContext('2d');

            caching();
            $u.loop(3,render);
        }

        function caching () {
            var i = 0;

            for(; i < variables.length; i++){
                var j = 0;
                for(; j < amount; j++){
                    var img = new Image();
                    img.src = prefix + variables[i] + (j + 1) + sufix;
                    cache.push(img);
                }
            }
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (indice > variables.length - 1) {
                indice = 1;
            }

            j = 0;

            for (; j < variables.length; j++) {
                img = new Image();
                img.src = prefix + variables[j] + indice + sufix;
                ctx.drawImage(img, widths[j], 0);
            }

            indice++;

        }

        return {
            init: init
        };

    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.BuildsCanvas = BuildsCanvas;

}(window, undefined));
