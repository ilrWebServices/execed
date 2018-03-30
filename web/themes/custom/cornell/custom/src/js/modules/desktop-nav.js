CRN.desktopNav = ((CRN, $) => {
    const { supportsPseudo } = UTIL;

    const focusWithin = (menu) => {
        [...menu.querySelectorAll('a, input, button')].forEach((el) => {
            const hasSubNav = el.classList.contains('site-nav__secondary-link');

            el.addEventListener('focus', (e) => {
                menu.classList.add('focused');
                if (hasSubNav) {
                    el.closest('.site-nav__item').classList.add('focused');
                }
            });

            el.addEventListener('blur', (e) => {
                menu.classList.remove('focused');

                if (hasSubNav) {
                    el.closest('.site-nav__item').classList.remove('focused');
                }
            });
        });
    };

    const init = (menu) => {
        if (!supportsPseudo(':focus-within')) {
            focusWithin(menu);
        }
    };

    return {
        init
    };

})(CRN, jQuery);
