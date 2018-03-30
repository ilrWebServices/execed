// Modified from: https://codepen.io/2kool2/pen/kXVKKb
CRN.ariaToggle = ((CRN, $) => {
    const openLabel = 'Open site navigation';
    const closeLabel = 'Close and hide site navigation';

    const setAriaStates = (button, menu, isExpanded) => {
        window.requestAnimationFrame(() => {
            button.setAttribute('aria-expanded', isExpanded);
            menu.setAttribute('aria-hidden', !isExpanded);
            button.setAttribute('aria-label', isExpanded ? closeLabel : openLabel);
        });
    };

    const toggleAriaStates = (e, button, menu) => {
        e.preventDefault();
        // JSON.parse forces the attribute from a string to a boolean, even when the string is 'false'
        const isExpanded = JSON.parse(button.getAttribute('aria-expanded') || false);

        setAriaStates(button, menu, !isExpanded);
    };

    const addAriaAttributes = (button, menu) => {
        button.setAttribute('aria-controls', menu.id);
        menu.setAttribute('aria-controlledby', button.id);
        setAriaStates(button, menu, false);

        return true;
    };

    const init = (button, menu) => {
        addAriaAttributes(button, menu);
    };

    return {
        init,
        toggleAriaStates,
    };

})(CRN, jQuery);
