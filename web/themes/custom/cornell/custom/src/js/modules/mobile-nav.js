CRN.mobileNav = ((CRN, $) => {
    const { toggleAriaStates } = CRN.ariaToggle;
    const { keepInRange, correctAngles, checkVelocity } = UTIL.hammerHelpers;

    // Remove the transition and animate the nav to the new position
    const animateMenu = (menu, distance) => {
        menu.style.transition = 'none';

        window.requestAnimationFrame(() => {
            menu.style.transform = `translate3d(${distance}px, 0, 0)`;
        });
    };

    // Check event to see if we should close the nav
    // Currently checks velocity (swipes should just close the nav)
    // and if the nav is over halfway closed
    const shouldClose = (e, menu) => {
        const menuWidth = menu.offsetWidth;
        const overHalf = keepInRange(e.deltaX, 0, menuWidth) > menuWidth / 2;
        const movingQuickly = checkVelocity(e.velocity) && e.direction === 4; // direction 4 = right
        return overHalf || movingQuickly;
    };

    const events = (els) => {
        const { button, menu, toggle } = els;
        const swipe = new Hammer(menu, {});

        // Scroll dropdown to bottom if search is focused.
        // Makes the experience better on mobile with soft
        // keyboards changing heights and all that
        menu.querySelector('.site-header__search-input').addEventListener('focus', (e) => {
            menu.scrollTop = menu.scrollHeight;
        });

        // Toggle state on click of this class
        [...toggle].forEach((el) => {
            el.addEventListener('click', (e) => {
                toggleAriaStates(e, button, menu);

                // JSON.parse forces the attribute from a string to a boolean, even when the string is 'false'
                const isExpanded = JSON.parse(button.getAttribute('aria-expanded') || false);
                
                if (isExpanded) {
                    enableBodyScroll(menu);
                } else {
                    disableBodyScroll(menu);
                }
            });
        });

        // Animate if it's a good angle. Panleft is needed for if they swipe back and forth.
        swipe.on('panright panleft', (e) => {
            if(correctAngles(e.angle)) {
                animateMenu(menu, keepInRange(e.deltaX, 0, menu.offsetWidth));
            }
        });

        // When they've finished panning, re-add the transitions and figure out where to
        // animate the nav to.
        swipe.on('panend', (e) => {
            
            window.requestAnimationFrame(() => {
                menu.style.transition = '';
                menu.style.transform = '';

                if (shouldClose(e, menu)) {
                    toggleAriaStates(e, button, menu);
                }
            });
        });
    };

    const init = (button, menu) => {
        const toggle = document.querySelectorAll('.js-hamburger-toggle');

        events({
            button,
            menu,
            toggle,
        });
    };

    return {
        init
    };

})(CRN, jQuery);
