(function(window, undefined) {
    'use strict';

    var Modal = (function() {
        var overlay = document.querySelector('.md-overlay'),
            close = document.querySelector('.md-close'),
            modal;

        function init() {
            registerEvents();
        }

        function registerEvents(e) {
            close.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                removeModalHandler();
            });
            overlay.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                removeModalHandler();
            });
        }

        function open(e) {
            var id = e.target.classList[1].split('icon-')[1];

            switch (id) {
                case '4g':
                    modal = document.querySelector('#modal-4g');
                    break;
                case 'wifi':
                    modal = document.querySelector('#modal-wifi');
                    break;
                case 'ft':
                    modal = document.querySelector('#modal-ft');
                    break;
                case 'arroba':
                    modal = document.querySelector('#modal-arroba');
                    break;
                case 'responsive':
                    modal = document.querySelector('#modal-responsive');
                    break;
                case 'video':
                    modal = document.querySelector('#modal-video');
                    break;
            }

            $s(overlay).addClass('md-show-overlay', 0.4);
            $s(modal).addClass('md-show', 0.4);
            $s(close).addClass('md-show', 0.4);
        }

        function removeModal(hasPerspective) {
            classie.remove(modal, 'md-show');

            if (hasPerspective) {
                classie.remove(document.documentElement, 'md-perspective');
            }
        }

        function removeModalHandler() {

            removeModal(classie.has(modal, 'md-setperspective'));
            classie.remove(modal, 'md-show');
            classie.remove(close, 'md-show');
            classie.remove(overlay, 'md-show-overlay');

            // window.OgvAd.Icons.deactive();

            if(window.OgvAd.Icons.completed()){
                window.OgvAd.Landscape.showCTA();
            }
        }

        return {
            init: init,
            open: open
        };

    }(window.OgvAd));

    window.OgvAd = window.OgvAd || {};
    window.OgvAd.Modal = Modal;

}(window, undefined));
