/*
  A sample jQuery plug-in: this one converts the selected elements into a 3D
  “swivel” control.

  This plugin's options object can include:

    change: function () { }
    - Callback for whenever the control has been manipulated.
*/
(($) => {
    $.fn.slider = function (options) {
        const $this = this;

        let $current = null;
        let anchorX = 0;
        let posRectLeft;
        let posRectRight;

        $this.addClass("slider").mousedown(function (event) {
            $current = $(this);
            anchorX = event.screenX - ($current.data('slider-place') || 0);
            posRectLeft = anchorX;
            posRectRight = posRectLeft + 300;
        });

        // Other mouse events go at the level of the document because
        // they might leave the element's bounding box.
        $(document).mousemove(event => {
            if ($current) {
                // let currentPlace = $current.data('slider-place') || 0;
                let newPlace = event.screenX - anchorX;
                let newCss = " translateX(" + newPlace + "px)";
                // let posRect = $(".rectangle").position();
                // let posRectLeft = posRect.left;
                // let posRectRight = posRectLeft + 300;
                let dog = "chihuahua";

                if (event.clientX > posRectLeft && event.clientX < posRectRight - 20){
                    $current.css({
                        'transform': newCss
                    }).data({
                        'slider-place': newPlace
                    });
                }

                if (event.clientX > posRectLeft && event.clientX < 150){
                    dog = "chihuahua";
                } else if (event.clientX >= 150 && event.clientX < 200){
                    dog = "pug";
                } else if (event.clientX >= 200 && event.clientX < 250){
                    dog = "poodle";
                } else if (event.clientX >= 250 && event.clientX < 300){
                    dog = "Husky";
                }

                // Invoke the callback. We want jQuery-like behavior that binds `this` to the component
                // that change, so we use `call` instead of plain parentheses.
                if ($.isPlainObject(options) && $.isFunction(options.change)) {
                    options.change.call($current, dog);
                }
            }
        }).mouseup(() => {
            $current = null;
        });

        return $this;
    };
})(jQuery);
