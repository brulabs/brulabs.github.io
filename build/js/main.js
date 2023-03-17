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

const CustomProperties = {
    props: [],
    init: function () {
        CustomProperties.props = [
            {element: window, cssVar: '--vh'}, // for viewHeight calc on mobile, e.g. for component hero -> height: calc(var(--vh) * 100)
            {element: window, cssVar: '--ih', type: 'innerHeight'}, // for innerHeight calc on mobile, e.g. for component pusha -> height: calc(var(--ih) * 100)
            { element: document.querySelector('.js-header'), cssVar: '--hh', type: 'offsetHeight' },
            {element: document.getElementById('js-infobar'), cssVar: '--ibh', type: 'offsetHeight'},
        ];
    },
    update: function () {
        Array.prototype.slice.call(CustomProperties.props).forEach(function (prop) {
            if (prop['element']) {
                switch (prop['type']) {
                    case 'offsetHeight':
                        CustomProperties.setVar(prop['cssVar'], prop['element'].offsetHeight);
                        break;
                    case 'innerHeight':
                        CustomProperties.setVar(prop['cssVar'], prop['element'].innerHeight * 0.01); // for overall browser support
                        break;
                    default:
                        CustomProperties.setVar(prop['cssVar'], prop['element'].document.documentElement.clientHeight * 0.01); // for overall browser support
                        break;
                }
            } else {
                CustomProperties.setVar(prop['cssVar'], 0);
            }
        });
    },
    getVar: function (name) {
        return Number(getComputedStyle(document.documentElement).getPropertyValue(name).replace("px", ""));
    },
    setVar: function (name, value) {
        document.documentElement.style.setProperty(name, "" + value + "px");
    }
};

CustomProperties.init();
CustomProperties.update();

const ToggleMode = {
    html: document.documentElement,
    logo: document.getElementById('logo'),

    init: function() {
        if (ToggleMode.logo) {
            ToggleMode.logo.addEventListener('click', function() {
                if (ToggleMode.html.classList.contains('dark-mode')) {
                    ToggleMode.html.classList.remove('dark-mode');
                    ToggleMode.html.classList.add('light-mode');
                } else if (ToggleMode.html.classList.contains('light-mode')) {
                    ToggleMode.html.classList.remove('light-mode');
                    ToggleMode.html.classList.add('dark-mode');
                }
            });
        }
    }
};

ToggleMode.init();

const Burger = {
    init: function () {
        document.getElementsByClassName('js-open-panel')[0].addEventListener('click', function() {
            this.classList.toggle('is-open');
        });
    },
};

Burger.init();


function scrollEvent() {
    GlobalEventThrottle.throttleScroll = false;
}

function resizeEvent() {
    CustomProperties.update(); // us this to update custom properties
    GlobalEventThrottle.throttleResize = false;
}

function loadEvent() {
    // Put your code here
}

function readyEvent() {
    // Put your code here
}
