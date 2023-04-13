var GlobalEventThrottle = {
    scrollEvent: null,
    resizeEvent: null,
    readyEvent: null,
    throttleScroll: false,
    throttleResize: false,
    init: function(event) {
        if (typeof scrollEvent === 'function') {
            window.addEventListener('scroll', GlobalEventThrottle.throttleScrollTrigger);
        }

        if (typeof loadEvent === 'function') {
            window.addEventListener('load', loadEvent);
        }

        if (typeof resizeEvent === 'function') {
            window.addEventListener('resize', GlobalEventThrottle.throttleResizeTrigger);
        }

        if (typeof readyEvent === 'function') {
            GlobalEventThrottle.readyEvent = event;
            GlobalEventThrottle.execute(readyEvent);
        }
    },
    throttleScrollTrigger: function(event) {
        GlobalEventThrottle.scrollEvent = event;
        GlobalEventThrottle.throttleScroll = GlobalEventThrottle.throttleScroll || setTimeout(GlobalEventThrottle.execute, 200, scrollEvent, 'throttleScroll');
    },
    throttleResizeTrigger: function(event) {
        GlobalEventThrottle.resizeEvent = event;
        GlobalEventThrottle.throttleResize = GlobalEventThrottle.throttleResize || setTimeout(GlobalEventThrottle.execute, 200, resizeEvent, 'throttleResize');
    },
    execute: function(func, throttle) {
        GlobalEventThrottle[throttle] = (typeof window.requestAnimationFrame === 'function' && window.requestAnimationFrame(func)) || func();
    }
};

GlobalEventThrottle.init();
