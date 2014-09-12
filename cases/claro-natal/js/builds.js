(function(window, undefined) {
    'use strict';

    var Builds = (function() {

        var i = 0,
            l,
            ls,
            sA = document.querySelectorAll('.build-1'),
            sB = document.querySelectorAll('.build-2'),
            sC = document.querySelectorAll('.build-3'),
            sD = document.querySelectorAll('.build-4'),
            sE = document.querySelectorAll('.build-5');


        function init() {
            l = sA.length;
            ls = 0;

            setInterval(render, 400);
        }

        function render() {
            if (i >= l) {
                i = 0;
            }

            if (i > 0) {
                ls = i - 1;
                classie.add(sA[ls], 'none');
                classie.add(sB[ls], 'none');
                classie.add(sC[ls], 'none');
                classie.add(sD[ls], 'none');
                classie.add(sE[ls], 'none');
            } else {
                classie.add(sA[l - 1], 'none');
                classie.add(sB[l - 1], 'none');
                classie.add(sC[l - 1], 'none');
                classie.add(sD[l - 1], 'none');
                classie.add(sE[l - 1], 'none');
            }

            classie.remove(sA[i], 'none');
            classie.remove(sB[i], 'none');
            classie.remove(sC[i], 'none');
            classie.remove(sD[i], 'none');
            classie.remove(sE[i], 'none');

            i++;
        }

        return {
            init: init
        };

    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Builds = Builds;

}(window, undefined));
