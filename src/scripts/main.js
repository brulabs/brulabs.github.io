//=include partials/global-event-throttle.js
//=include partials/custom-properties.js
//=include partials/toggle-mode.js
//=include partials/burger.js

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
