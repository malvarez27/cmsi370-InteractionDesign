($ => {

    /**
     * Tracks a Bubble as it is rubberbanded or moved across the drawing area.
     * Note how we can use arrow function notation here because we don't need
     * the `this` variable in this implementation.
     */
    let myMap = new Map();

    let keyString = '',
    keyObj = {},
    keyFunc = function() {};
    let anchorX;
    let anchorY;


    let trackDrag = event => {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.

            if (touch.target.movingBubble) {
                // Reposition the object.
                let newPosition = {
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                };

                // This form of `data` allows us to update values one attribute at a time.
                $(touch.target).data('position', newPosition);
                touch.target.movingBubble.offset(newPosition);
            } else if (myMap.has(touch.identifier)) {
                let drawingBubble = myMap.get(touch.identifier);
                let newPosition = {
                    left: (anchorX < touch.pageX) ? anchorX : touch.pageX,
                    top: (anchorY < touch.pageY) ? anchorY : touch.pageY
                };

                drawingBubble
                    .width((Math.abs(anchorY - touch.pageY) + Math.abs(anchorX - touch.pageX)) / 2)
                    .height((Math.abs(anchorY - touch.pageY) + Math.abs(anchorX - touch.pageX)) / 2)
                    .data({ position: newPosition })
                    .offset(newPosition);
            }
        });

        // Don't do any touch scrolling.
        event.preventDefault();
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    let endDrag = event => {
        $.each(event.changedTouches, (index, touch) => {
            if (touch.target.movingBubble) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBubble.
                touch.target.movingBubble = null;
            }
        });
    };

    /**
     * Indicates that an element is unhighlighted.
     */
    let unhighlight = event => $(event.currentTarget).removeClass("bubble-highlight");
    let startBubble = event => {
        $.each(event.changedTouches, (index, touch) => {
            anchorX = touch.pageX;
            anchorY = touch.pageY;
            this.drawingBubble = $("<div></div>")
                .appendTo("#drawing-area")
                .addClass("bubble")
                .css({width: "50px", height: "50px"})
                .data({
                    position: {left: touch.pageX, top: touch.pageY },
                    velocity: {x: 0, y: 0, z: 0},
                    acceleration: {x: 0, y: 0, z: 0}
                }) // This is our model.
                .offset({left: touch.pageX, top: touch.pageY})
                .bind("touchmove", trackDrag)
                .bind("touchend", endDrag)
                .bind("touchstart", startMove)
                .bind("touchend", unhighlight);
            myMap.set(touch.identifier, this.drawingBubble);
        });
        event.preventDefault();
    };
    let startMove = event => {
        $.each(event.changedTouches, (index, touch) => {


            // Highlight the element.
            $(touch.target).addClass("bubble-highlight");

            // Take note of the Bubble's current (global) location. Also, set its velocity and acceleration to
            // nothing because, well, _finger_.
            let targetBubble = $(touch.target);
            let startOffset = targetBubble.offset();
            targetBubble.data({
                position: startOffset,
                velocity: { x: 0, y: 0, z: 0 },
                acceleration: { x: 0, y: 0, z: 0 }
            });

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBubble = targetBubble;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    };

    /**
     * The motion update routine.
     */
    const FRICTION_FACTOR = 0.999;
    const ACCELERATION_COEFFICIENT = -0.05;
    const FRAME_RATE = 120;
    const FRAME_DURATION = 1000 / FRAME_RATE;

    let lastTimestamp = 0;
    let updateBubbles = timestamp => {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
        }

        // Keep that frame rate under control.
        if (timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(updateBubbles);
            return;
        }

        $("div.bubble").each((index, element) => {
            let $element = $(element);

            // If it's highlighted, we don't accelerate it because it is under a finger.
            if ($element.hasClass("bubble-highlight")) {
                $element.width($element.width() + 5);
                $element.height($element.height() + 5);
                if ($element.width() > 225) {
                    $element.remove();
                }

                return;
            }

            // Note how we base all of our calculations from the _model_...
            let s = $element.data('position');
            let v = $element.data('velocity');
            let a = $element.data('acceleration');

            // The standard update-bounce sequence.
            s.left += v.x;
            s.top -= v.y;

            v.x += (a.x * ACCELERATION_COEFFICIENT);
            v.y += (a.y * ACCELERATION_COEFFICIENT);
            v.z += (a.z * ACCELERATION_COEFFICIENT);

            v.x *= FRICTION_FACTOR;
            v.y *= FRICTION_FACTOR;
            v.z *= FRICTION_FACTOR;

            let $parent = $element.parent();
            let bounds = {
                left: $parent.offset().left,
                top: $parent.offset().top
            };

            bounds.right = bounds.left + $parent.width();
            bounds.bottom = bounds.top + $parent.height();

            if ((s.left <= bounds.left) || (s.left + $element.width() > bounds.right)) {
                s.left = (s.left <= bounds.left) ? bounds.left : bounds.right - $element.width();
                v.x = -v.x;
            }

            if ((s.top <= bounds.top) || (s.top + $element.height() > bounds.bottom)) {
                s.top = (s.top <= bounds.top) ? bounds.top : bounds.bottom - $element.height();
                v.y = -v.y;
            }

            // ...and the final result is sent on a one-way trip to the _view_.
            $(element).offset(s);
        });

        lastTimestamp = timestamp;
        window.requestAnimationFrame(updateBubbles);
    };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    let setDrawingArea = jQueryElements => {
        // Set up any pre-existing Bubble elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")

            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each((index, element) => {
                $(element)
                    .bind("touchstart", startBubble)
                    .bind("touchmove", trackDrag)
                    .bind("touchend", endDrag);
            })

            .find("div.bubble").each((index, element) => {
                $(element)
                    .bind("touchstart", startMove)
                    .bind("touchend", unhighlight)
                    .data({
                        position: $(element).offset(),
                        velocity: { x: 0, y: 0, z: 0 },
                        acceleration: { x: 0, y: 0, z: 0 }
                    });
            });

        // In this sample, device acceleration is the _sole_ determiner of a Bubble's acceleration.
        window.ondevicemotion = event => {
            let a = event.accelerationIncludingGravity;
            $("div.bubble").each((index, element) => {
                $(element).data('acceleration', a);
            });
        };

        // Start the animation sequence.
        window.requestAnimationFrame(updateBubbles);
    };

    // No arrow function here because we don't want lexical scoping.
    $.fn.bubblesWithPhysics = function () {
        setDrawingArea(this);
        return this;
    };
})(jQuery);
