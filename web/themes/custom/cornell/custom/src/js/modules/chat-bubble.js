CRN.chatBubble = ((CRN, $) => {
    const events = (els) => {
        [...els.bubble.querySelectorAll('.js-toggle-bubble')].forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();

                els.bubble.classList.toggle('open');
            });
        });

        // Click outside of chat box should hide it
        window.addEventListener('click', (e) => {
            if (!els.bubble.contains(e.target)) {
                els.bubble.classList.remove('open');
            }
        });
    };

    const init = () => {
        const bubble = document.querySelector('.chat-bubble');

        if (bubble) {
            events({
                bubble,
            });
        }
    };

    return {
        init
    };

})(CRN, jQuery);
