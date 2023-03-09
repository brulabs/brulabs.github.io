// Global var
let lastScroll = 0;

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



document.addEventListener("DOMContentLoaded", function(event) {

    document.getElementById('burger').addEventListener('click', function() {
        this.classList.toggle('open');

        document.getElementById("nav").classList.toggle("change");
        document.getElementById("menu-bg").classList.toggle("change-bg");
    });

    CustomProperties.init();
    CustomProperties.update();



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
