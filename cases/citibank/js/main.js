(function($) {
    $.fn.customFadeIn = function(speed, callback) {
        $(this).fadeIn(speed, function() {
            if(jQuery.browser.msie)
                $(this).get(0).style.removeAttribute('filter');
            if(callback != undefined)
                callback();
        });
    };
    $.fn.customFadeOut = function(speed, callback) {
        $(this).fadeOut(speed, function() {
            if(jQuery.browser.msie)
                $(this).get(0).style.removeAttribute('filter');
            if(callback != undefined)
                callback();
        });
    };
})(jQuery);

(function(window, document, undefined) {
    'use strict';

    var Main = (function() {
        var form = document.getElementById('cambio'),
            currencyFrom = document.getElementById('selectFrom'),
            currencyTo = document.getElementById('selectTo'),
            amount = document.getElementById('amount'),
            submit = document.getElementById('submit'),
            output = document.getElementById('output'),
            replay = document.getElementById('replay'),
            cta = document.getElementById('cta'),
            sending = false;



        function init() {
            $('.step2').hide();
            $('.step3').hide();

            output.innerHTML = '';
            form.addEventListener('submit', convert)
            replay.addEventListener('click', replayAd);
            cta.addEventListener('click', clicktag);

            ctaEffect();

            $("#amount").maskMoney({
                thousands: '',
                decimal: ','
            });

            $('form').bind("keypress", function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    if(sending){
                        return false;
                    }else{
                        convert();
                    }
                    sending = true;
                }
            });
        };

        function clicktag() {
            EB.clickthrough();
        }

        function ctaEffect() {
            foward();

            function foward() {
                $('#effect').animate({
                    left: '120px'
                }, 1500, backward);
            }

            function backward() {
                $('#effect')[0].style.left = '290px';
                setTimeout(foward, 1000);
            }
        }

        function convert(e) {
            EB.userActionCounter("Convert");
            if(e) e.preventDefault();

            sending = true;

            if (amount.value == '0,00' || amount.value == '') amount.value = '1,00';

            var value = amount.value;

            value = value.split('.').join('');
            value = value.split(',').join('.');

            disableButtons();
            output.innerHTML = '...'

            Cambio.convertRate(currencyFrom.value, currencyTo.value, value, function(rate, symbol) {
                output.innerHTML = rate.split('.').join(',');
                setTimeout(motionStep2, 2000);
                setTimeout(motionStep3, 4000);
            });
        };

        function motionStep2() {
            $('.step1').hide();
            $('.step2').show();
            // $('.step1').fadeTo(1000,0, function() {
                // $('.step2').fadeTo(1000,1);
            // });
        }

        function motionStep3() {
            $('.step2').hide();
            $('.step3').show();
            // $('.step2').customFadeOut(1000,0, function() {
                // $('.step3').customFadeIn(1000,1);
            // });
        }

        function replayAd() {
            EB.userActionCounter("Replay");

            $('.step1').show();

            $('.step2').addClass('none');
            $('.step2').hide();

            $('.step3').addClass('none');
            $('.step3').hide();

            amount.value = '';
            output.innerHTML = '';

            enableButtons();

            sending = false;
        }

        function disableButtons() {
            $('#block')[0].style.display = 'block';
        };

        function enableButtons() {
            $('#block')[0].style.display = 'none';
        };

        return {
            init: init
        }
    }());

    window.Main = Main;
}(window, document, undefined));
