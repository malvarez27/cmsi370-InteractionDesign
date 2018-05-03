describe("Slider jQuery plugin", () => {
    const options = {
        change: () => {
            // No-op; Jasmine spy will check on whether this got called.
        }
    };

    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("jquery.slider.fixture.html");
    });
    afterEach(() => fixture.cleanup());

    it("should return itself when the plugin is installed", () => {
        const $target = $(".slider-test");
        const $pluginResult = $target.slider(options);

        expect($pluginResult).toBe($target);
    });
    let transformUpdateTest = () => {
        // When synthesizing events, we need only explicitly set the values that the plugin code will
        // actually use.
        const mousedown = $.Event("mousedown", { screenX: 20 });
        $(".slider-test").trigger(mousedown);

        let mousemove = $.Event("mousemove", { screenX: 10 });
        $(".slider-test").trigger(mousemove);

        // We check against the style attribute because the CSS property will be the generalized "converted"
        // value of the transform, which is too unwieldy to express manually.
        expect($(".slider-test").attr('style')).toBe(undefined);

        mousemove = $.Event("mousemove", { screenX: 30 });
        $(".slider-test").trigger(mousemove);
        expect($(".slider-test").attr('style')).toBe(undefined);

        $(".slider-test").trigger($.Event("mouseup"));
    };

    let sliderPlaceUpdateTest = () => {
        const mousedown = $.Event("mousedown", { screenX: 20 });
        $(".slider-test").trigger(mousedown);

        let mousemove = $.Event("mousemove", { screenX: 10 });
        $(".slider-test").trigger(mousemove);
        expect($(".slider-test").data('slider-place')).toBe(undefined);

        mousemove = $.Event("mousemove", { screenX: 30 });
        $(".slider-test").trigger(mousemove);
        expect($(".slider-test").data('slider-place')).toBe(undefined);

        $(".slider-test").trigger($.Event("mouseup"));
    };

    describe("installed behavior with callback", () => {
        beforeEach(() => $(".slider-test").slider(options));

        it("should update its CSS transform correctly", transformUpdateTest);
        it("should update the slider place correctly", sliderPlaceUpdateTest);

        it("should invoke the callback correctly", () => {
            spyOn(options, 'change');

            const mousedown = $.Event("mousedown", { screenX: 20 });
            $(".slider-test").trigger(mousedown);

            let mousemove = $.Event("mousemove", { screenX: 10 });
            $(".slider-test").trigger(mousemove);
            expect(options.change).toHaveBeenCalledWith("chihuahua");

            mousemove = $.Event("mousemove", { screenX: 30 });
            $(".slider-test").trigger(mousemove);
            expect(options.change).toHaveBeenCalledWith("chihuahua");

            $(".slider-test").trigger($.Event("mouseup"));
        });
    });

    describe("installed behavior without callback", () => {
        beforeEach(() => $(".slider-test").slider());


        it("should update its CSS transform correctly", transformUpdateTest);
        it("should update its CSS transform correctly", sliderPlaceUpdateTest);
    });
});
