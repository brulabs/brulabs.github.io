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
