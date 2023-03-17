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
