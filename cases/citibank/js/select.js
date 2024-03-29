(function(window, document, undefined) {
    'use strict';
    var SELECT = (function() {
        'use strict';

        function init() {
            $("select.prettyfied").each(function() {
                var $select = $(this),
                    $container = $("<div>", {
                        class: "prettyfied-select",
                        id:$(this).prop('id'),
                        html: '<div class="prettyfied-select-box"><span></span></div>',
                    }),
                    $dropDown = $("<ul>", {
                        class: "dropDown",
                    }),
                    $selectBox = $container.find(".prettyfied-select-box");

                $select.find("option").each(function(i) {
                    var $option = $(this),
                        $li;

                    if (i === $select.prop("selectedIndex")) {
                        $selectBox.html("<span>" + $option.text() + "</span>");
                    }

                    // As of jQuery 1.4.3 we can access HTML5 data attributes with the
                    // data() method.

                    // Creating a dropdown item according to the data-icon and
                    // data-html-text HTML5 attributes:
                    $li = $("<li>", {
                        html: '<span>' + $option.text() + '</span>',
                    });

                    // Add the option to the dropdown
                    $dropDown.append($($li));

                    $li.click(function() {
                        $selectBox.html("<span>" + $option.text() + "</span>");
                        $dropDown.trigger("hide");

                        // When a click occurs, we are also reflecting the change on the
                        // original select element:
                        $select.val($option.val());

                        return false;
                    }).hover(function() {
                        $(this).addClass("hover");
                    }, function() {
                        $(this).removeClass("hover");
                    });
                });

                $container.append($dropDown.hide());
                $select.hide().after($container);

                // Binding custom show and hide events on the dropDown:
                $dropDown.bind("show", function() {
                    if ($dropDown.is(":animated")) {
                        return false;
                    }

                    $selectBox.addClass("expanded");
                    $dropDown.slideDown();
                }).bind("hide", function() {
                    if ($dropDown.is(":animated")) {
                        return false;
                    }

                    $selectBox.removeClass("expanded");
                    $dropDown.addClass("is-hidden").slideUp(function() {
                        $(this).removeClass('is-hidden');
                    });
                }).bind("toggle", function() {
                    if ($selectBox.hasClass("expanded")) {
                        $dropDown.trigger("hide");
                    } else $dropDown.trigger("show");
                });

                $selectBox.click(function() {
                    $dropDown.trigger("toggle");
                    return false;
                });

                // If we click anywhere on the page, while the
                // dropdown is shown, it is going to be hidden:
                $(document).click(function() {
                    $dropDown.trigger("hide");
                });

                // $(this).remove();
            });
        };
        return {
            init: init
        }

    }());
    window.SELECT = SELECT;
}(window, document, undefined));
