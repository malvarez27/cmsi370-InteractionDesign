$(() => {
    let $log = $(".event-log");
    let logEvent = (message) => {
        $log.text($log.text() + message + "\n")
            .scrollTop($log[0].scrollHeight - $log.height());
    };
    $(".slider-this").slider({
        change: function (dog) {
            logEvent("Slider: Slid from " + dog);
        }
    });

});
