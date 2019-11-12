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
		CRN.tabToggle.init();
		CRN.formValidation.init();
		CRN.slideShow.init();
		CRN.videoEmbedField.init();

		if (document.querySelector('.box')) {
			const rellax = new Rellax('.box');
		}
	}

	return {
		init: init
	};

})(CRN, jQuery);

CRN.router.init();
