(function() {
    'use strict';

    var Gesture = function(element, callback) {
        return new Gesture.Instance(element, callback);
    };

    Gesture.Instance = function(document, callback) {
        this.document = document;
        this.dispatch = null;
        this.callback = callback;
        this.setup();
    };

    Gesture.Instance.prototype = {
        setup: function() {
            this.dispatch = function dispatch(event) {
                switch (event.type) {
                    case 'touchstart':
                        event.preventDefault();
                        that.pageY = event.changedTouches[0].pageY;
                        break;
                    case 'touchmove':
                        if (that.pageX && event.changedTouches[0].pageX > that.pageX) {
                            return;
                        }
                        setDrag(event);
                        that.pageX = event.changedTouches[0].pageX;
                        break;
                    case 'touchend':
                        that.pageX = null;
                        break;
                }
                that.callback(event);
            }

            function setDrag(event) {
                var dragging = false;
                if (that.getPageX() && event.changedTouches[0].pageX > that.getPageX()) {
                   return;
                } else {
                    that.dragging = true;
                }
            }

            var that = this;
            this.document.addEventListener('touchstart', this.dispatch);
            this.document.addEventListener('touchmove', this.dispatch);
            this.document.addEventListener('touchend', this.dispatch);
            this.pageX = null;
            this.pageY = null;
            this.dragging = false;

        },
        getPageX: function() {
            return this.pageX;
        },
        getPageY: function() {
            return this.pageY;
        },
        getDrag:function() {
            return this.dragging;
        },
        stop: function() {
            this.document.removeEventListener('touchstart', this.dispatch);
            this.document.removeEventListener('touchmove', this.dispatch);
            this.document.removeEventListener('touchend', this.dispatch);
        }
    };

    window.Gesture = Gesture;
}());
