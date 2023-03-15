const Burger = {
    init: function () {
        document.getElementById('burger').addEventListener('click', function() {
            this.classList.toggle('open');
        });

        document.getElementsByClassName('js-open-panel')[0].addEventListener('click', function() {
            this.classList.toggle('is-open');
        });
    },
};

Burger.init();
