(function(window, undefined) {
    'use strict';

    var Icons = (function() {
        var arr = [],
            mX, mY, mZ,
            viewed = 0,
            views = [],
            completed = false;

        function init () {
            // register icons
            register();
            // register mouse and shake events
            registerEvents();
            // exhibit
            show();
            // effect
            setPulse();
        }

        function register(){
            arr.push('.icon-4g');
            arr.push('.icon-wifi');
            arr.push('.icon-arroba');
            arr.push('.icon-ft');
            arr.push('.icon-responsive');
            arr.push('.icon-video');
        }

        function registerEvents(){
            var i = 0,
                l = arr.length;
            for(; i < l; i++) {
                $s(arr[i]).addEventListener('mousedown', onClick);
            }
        }

        function onClick (e) {

            var id = e.target.classList[1].split('icon-')[1],
                active = document.querySelector('.icon-'+id+'-active');

            if(!checkViewd(e.target.classList[1])){
                views.push(e.target.classList[1]);
                checkLimit();
            }

            classie.remove(e.target, 'pulse');
            classie.remove(e.target, 'opacity103s');
            classie.add(e.target, 'icon-active');
            classie.add(active, 'opacity103s');

            window.OgvAd.Modal.open(e);
        }

        function checkViewd (id) {
            var i = 0,
                l = views.length,
                only = false;

            for(; i < l; i++){
                if(id === views[i]){
                    only = true;
                    break;
                }
            }

            return only;
        }

        function checkLimit () {
            if(views.length === arr.length){
                completed = true;
            }
        }

        function getCompleted () {
            return completed;
        }

        // Clear active icons
        function  deactive () {
            var i = 0,
                l = arr.length;

            for(; i < l; i++){
                if(classie.has($s(arr[i]),'icon-active')){
                    var cn = $s(arr[i]).className,
                        k = cn.split(' '),
                        id = k[1].split('icon-'),
                        active = document.querySelector('.icon-'+id[1]+'-active');

                    classie.remove(active, 'opacity103s');
                    classie.remove($s(arr[i]), 'icon-active');
                    classie.add($s(arr[i]), 'pulse');
                }
            }
        }

        function setPulse(){
            var i = 0,
                l = arr.length,
                delay = 1.6;

            for(; i < l; i++){
                $s(arr[i]).addClass('pulse', delay);
                delay += 0.1;
            }
        }

        function removePulse(){
            var i = 0,
                l = arr.length,
                delay = 1.6;

            for(; i < l; i++){
                $s(arr[i]).removeClass('pulse', delay);
                delay += 0.1;
            }
        }

        function setFloating(){
            var i = 0,
                l = arr.length,
                delay = 1.6;

            for(; i < l; i++){
                $s(arr[i]).addClass('floating', delay);
                delay += 0.1;
            }
        }

        function disable () {
          var i = 0,
              l = arr.length;
          for(; i < l; i++) {
              $s(arr[i]).removeEventListener('mousedown', onClick);
          }
          // window.removeEventListener('shake', shake, false);
        }

        function show(){
            var i = 0,
                l = arr.length,
                delay = 1.6;

            for(; i < l; i++){
                $s(arr[i]).addClass('opacity103s', delay);
                delay += 0.1;
            }
        }

        function hide(){
            var i = 0,
                l = arr.length,
                delay = 0;

            for(; i < l; i++){
                var cn = $s(arr[i]).className,
                    li = cn.split(' '),
                    id = li[1].split('icon-');

                $s(arr[i]).addClass('opacity003s', delay);
                $s('.icon-'+id[1]+'-active').addClass('opacity003s', delay);
                delay += 0.1;
            }
        }

        return {
            init: init,
            show: show,
            hide: hide,
            disable: disable,
            pulse: setPulse,
            pulseoff: removePulse,
            floating: setFloating,
            deactive: deactive,
            completed: getCompleted
        };

    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Icons = Icons;

}(window, undefined));
