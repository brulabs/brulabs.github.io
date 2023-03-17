const Burger = {
    init: function () {
        document.getElementsByClassName('js-open-panel')[0].addEventListener('click', function() {
            this.classList.toggle('is-open');
        });
    },
};

Burger.init();
