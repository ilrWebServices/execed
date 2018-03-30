CRN.router = (function(CRN, $) {

	const initNav = () => {
		const button = document.querySelector('#hamburger');
		const menu = document.querySelector('#dropdown');

		CRN.mobileNav.init(button, menu);
		CRN.ariaToggle.init(button, menu);
		CRN.desktopNav.init(document.querySelector('.site-header__content'));
	};

	function init() {
		initNav();
		CRN.chatBubble.init();
	}

	return {
		init: init
	};

})(CRN, jQuery);

CRN.router.init();