const Burger = {
    Navigation: document.getElementById('navigation'),

    init: function () {
        document.getElementsByClassName('js-open-panel')[0].addEventListener('click', function() {
            this.classList.toggle('is-active');
            Burger.Navigation.classList.toggle('is-open');
        });
    },
};

Burger.init();
