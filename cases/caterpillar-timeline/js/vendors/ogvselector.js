(function(window, undefined) {
    'use strict';

    /**
    Retorna o HTMLElement do seletor passado por parâmetro e atribui metodos ao elemento

    @class $s
    @param {String} Seletor
    @return {HTMLElement}
    **/
    var $s = function(context) {
        return $s.fn.selector(context);
    };

    $s.fn = $s.prototype = {
        selector: function(context) {
            var el = document.querySelector(context);
            $s.fn.methods.call(el);
            return el;
        },
        methods: function() {
            /**
            Esconde o elemento, com a possibilidade de atraso passado por parâmetro.
            @method none
            @param {Number} delay Tempo em segundos, para atribuir o estilo de 'display:none' no elemento.
            @return false
            **/
            this.none = function(delay) {
                var $this = this;

                if (delay === undefined) {
                    delay = 0;
                }

                setTimeout(function() {
                    $this.style.display = 'none';
                }, delay * 1000);

                return false;
            };
            /**
            Exibe o elemento, com a possibilidade de atraso passado por parâmetro.

            @method block
            @param {Number} delay Tempo em segundos, para atribuir o estilo de 'display:block' no elemento.
            @return false
            **/
            this.block = function(delay) {
                var $this = this;

                if (delay === undefined) {
                    delay = 0;
                }

                setTimeout(function() {
                    $this.style.display = 'block';
                }, delay * 1000);

                return false;
            };
            /**
            Atribui um o evento ao elemento.

            @method on
            @param {String} event Evento a ser ouvido.
            @param {Function} callback Função a ser executada quando o evento for invocado.
            @return false
            **/
            this.on = function(events, callback) {
                var evts = events.split(' '),
                    i = 0,
                    l = evts.length;

                for (; i < l; i++) {
                    this.addEventListener(evts[i], callback, true);
                }
                return false;
            };
            /**
            Remove um o evento do elemento.

            @method off
            @param {String} event Evento a ser removido.
            @param {Function} method Função a ser executada quando o evento for removido.
            @return false
            **/
            this.off = function(events, method) {
                var evts = events.split(' '),
                    i = 0,
                    l = evts.length;

                for (; i < l; i++) {
                    this.removeEventListener(evts[i], method, true);
                }

                // return false;
            };
            /**
            Retorna a propriedade do elemento em formato de texto.

            @method cssValue
            @param {String} property Propriedade css a ser retornada.
            @return {String}
            **/
            this.cssValue = function(property) {
                return window.getComputedStyle(this, null).getPropertyCSSValue(property).cssText;
            };
            /**
           Retorna a largura do elemento.

           @method getWidth
           @return {String}
           **/
            this.getWidth = function() {
                return parseInt(this.cssValue('width'), 10);
            };
            /**
           Retorna a altura do elemento.

           @method getHeight
           @return {String}
           **/
            this.getHeight = function() {
                return parseInt(this.cssValue('height'), 10);
            };
            /**
            Adiciona uma classe ao elemento.

            @method addClass
            @param {String} name Nome da classe.
            @param {Number} delay Tempo em segundos, para adicionar a classe no elemento.
            @return false
            **/
            this.addClass = function(name, delay) {
                var $this = this;

                setTimeout(function() {
                    $this.classList.add(name);
                }, delay * 1000);

                return false;
            };
            /**
            Remove uma classe do elemento.

            @method removeClass
            @param {String} name Nome da classe.
            @param {Number} delay Tempo em segundos, para remove a classe no elemento.
            @return false
            **/
            this.removeClass = function(name, delay) {
                var $this = this;

                setTimeout(function() {
                    $this.classList.remove(name);
                }, delay * 1000);

                return false;
            };
            /**
            Manipula o estilo css 'translate' do elemento

            @method translate
            @param {Number} x Deslocamento no eixo x a percorrer.
            @param {Number} y Deslocamento no eixo y a percorrer.         
            @param {Number} rotate Rotação que o elemento irá sofrer.            
            @param {Number} scale Escala que o elemento irá sofrer.
            @return false
            **/
            this.trans = function(x, y, rotate, scale) {
                this.style.webkitTransform = "translate(" + x + "px, " + y + "px) rotate(" + rotate + "deg) scale(" + scale + ")";

                return false;
            };
        }
    };

    window.$s = $s;

}(window, undefined));
