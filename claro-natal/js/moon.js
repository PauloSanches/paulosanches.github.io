(function(window, undefined) {
    'use strict';
    var Moon = (function() {
        var indice = 0,
            scenes = document.querySelectorAll('.moon-scene'),
            l = scenes.length,
            ls, mX, mY, mZ;

        function init(){
            // window.addEventListener('devicemotion', onDeviceMotion, false);
            setInterval(render, 70);
        }

        function onDeviceMotion (e) {
            mX = Math.floor(e.accelerationIncludingGravity.x);
            mY = Math.floor(e.accelerationIncludingGravity.y) * 5;
            mZ = Math.floor(e.accelerationIncludingGravity.z);

            render();
        }

        function render(){
            if(indice >= l){
              indice = 0;
              // classie.add(scenes[indice],'none');
            }

            if(indice > 0){
                ls = indice - 1;
                // console.log(indice, ls);
                classie.add(scenes[ls],'none');
            }else{
                classie.add(scenes[l-1],'none');
            }

            classie.remove(scenes[indice],'none');

            // scenes[indice].style["-webkit-transform"] = "rotateY(" + mY + "deg)";

            indice++;
        }

        return {
            init: init
        };
        
    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Moon = Moon;

}(window, undefined));
