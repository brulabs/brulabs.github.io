const Burger = {
    init: function () {
        document.getElementById('burger').addEventListener('click', function() {
            this.classList.toggle('open');
        })
    },
};

Burger.init();
