// Global var
let lastScroll = 0;

//=include partials/custom-properties.js
//=include partials/toggle-mode.js

document.addEventListener("DOMContentLoaded", function(event) {

    //document.getElementById('burger').addEventListener('click', function() {
    //    this.classList.toggle('open');
    //
    //    document.getElementById("nav").classList.toggle("change");
    //    document.getElementById("menu-bg").classList.toggle("change-bg");
    //});

    //CustomProperties.init();




    //function menuOnClick() {
    //    document.getElementById("menu-bar").classList.toggle("change");
    //    document.getElementById("nav").classList.toggle("change");
    //    document.getElementById("menu-bg").classList.toggle("change-bg");
    //}



    /*
    Scroll spy
     */
    //window.addEventListener("scroll", function(event) {
    //    let scrollY = this.scrollY;
    //    let isScrolled = 'scroll';
    //
    //    if (scrollY > 50) {
    //        document.body.classList.add(isScrolled);
    //    } else {
    //        document.body.classList.remove(isScrolled);
    //    }
    //});

    /*
    Scroll direction
     */
    //window.addEventListener("scroll", function(event) {
    //    let scrollY = this.scrollY;
    //    let scrollUp = 'scroll-up';
    //    let scrollDown = 'scroll-down';
    //
    //    if (scrollY <= 50) {
    //        document.body.classList.remove(scrollUp, scrollDown);
    //        return;
    //    }
    //
    //    if (scrollY > 50) {
    //        if (scrollY > lastScroll &&
    //            !document.body.classList.contains(scrollDown)) {
    //            //down
    //            document.body.classList.remove(scrollUp);
    //            document.body.classList.add(scrollDown);
    //        } else if (scrollY < lastScroll &&
    //            document.body.classList.contains(scrollDown)) {
    //            //up
    //            document.body.classList.remove(scrollDown);
    //            document.body.classList.add(scrollUp);
    //        }
    //
    //        lastScroll = scrollY;
    //    }
    //});

    /*
    InView
     */
    //window.addEventListener("scroll", function(event) {
    //    InView.checkElements();
    //});

    /*
    Set the offset so the the mouse pointer matches your gif's pointer
     */
    //var cursorOffset = {
    //    left : 25, top  : 25
    //}

    //document.getElementById('body').addEventListener("mousemove", function (e) {
    //    var $cursor = document.getElementById('cursor')
    //
    //    $cursor.style.left = (e.pageX - cursorOffset.left) + 'px';
    //    $cursor.style.top = (e.pageY - cursorOffset.top) + 'px';
    //
    //}, false);

    /*
    Toggle mode (bright/dark)
     */
    //document.getElementById('logo').addEventListener('click', function() {
    //    document.body.classList.toggle('dark-mode');
    //});
});

window.onresize = function(event) {
    CustomProperties.update();
};
