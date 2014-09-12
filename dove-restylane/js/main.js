(function(OgvAd) {
    'use strict';
    var Main = (function() {
        var element = document.querySelector('#frames'),
            audio = document.createElement('audio'),
            message = document.querySelector('#texto'),
            pack = document.querySelector('.pack'),
            packBottom = document.querySelector('.pack-bottom'),
            rip,
            audioPause,
            gesture,
            startPageX,
            distance;

        function init() {
            audio.setAttribute('src', 'audio/file.mp3');
            // audio.setAttribute('autoplay', '');
            rip = new window.Frames(element, {
                fps: 60,
                drag: true,
                timer: 100,
                skip: 5,
                onComplete: assignature,
                onUpdate: update
            });
            gesture = new window.Gesture(window, function(event) {
                gestureHandler(event);
            });
        };

        function update() {
            updateMessage();
            updateAudioTime();
        };

        function assignature() {
            pack.style.WebkitMaskPosition = '0 ' + message.style.top;
            gesture.stop();
            setTimeout(reveal, 2000);
        }

        function reveal() {
            document.querySelector('.some-tudo').classList.add('hide');
            pack.classList.add('pack-default');
            pack.style.WebkitMaskPosition = '0 0';
        };

        function gestureHandler(event) {
            switch (event.type) {
                case 'touchstart':
                    startPageX = event.changedTouches[0].pageX;
                    if (element.style.top) {
                        return;
                    }
                    if (gesture.getPageY() < element.clientHeight) {
                        element.style.top = '0px';
                        message.style.top = 34 + 'px';
                    } else if (gesture.getPageY() > 1024 - element.clientHeight) {
                        element.style.top = 1024 - element.clientHeight + 'px';
                        message.style.top = (1024 - element.clientHeight) + 34 + 'px';
                    } else {
                        element.style.top = event.changedTouches[0].pageY - (element.clientHeight / 2) + 'px';
                        message.style.top = (event.changedTouches[0].pageY - (element.clientHeight / 2) + 34) + 'px';
                    }
                    break;
                case 'touchmove':
                    distance = startPageX - event.changedTouches[0].pageX;
                    break;
                case 'touchend':
                    break;
            }
        };

        function updateAudioTime() {
            // console.log(distance);
            audio.play();
            clearTimeout(audioPause);
            audioPause = setTimeout(function() {
                audio.pause();
            }, distance);
        };

        function updateMessage() {
            var pos = 710 - ((rip.options.indice * 17) - 48);
            if (pos < 0) {
                pos = 0;
            }
            if (rip.options.indice <= 4) {
                pos = pos + 26;
            }
            message.style.WebkitMaskPosition = pos + 'px 0';
        };
        return {
            init: init
        };
    }());
    OgvAd.Main = Main;
    window.addEventListener('load', function() {
        OgvAd.Main.init();
    });
}(window.OgvAd = window.OgvAd || {}));