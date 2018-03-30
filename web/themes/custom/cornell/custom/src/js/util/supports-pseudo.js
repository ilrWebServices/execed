/**
 * Test for pseudo-class support
 * @param  {String} pseudoClass The pseudo-class
 * @return {Boolean}            Returns true if supported
 */

var UTIL = UTIL || {};
UTIL.supportsPseudo = ((UTIL, $) => {
    return function (pseudoClass) {

        // Get the document stylesheet
        var ss = document.styleSheets[0];

        // Create a stylesheet if one doesn't exist
        if (!ss) {
            var el = document.createElement('style');
            document.head.appendChild(el);
            ss = document.styleSheets[0];
            document.head.removeChild(el);
        }

        // Test the pseudo-class by trying to style with it
        var testPseudo = function () {
            try {
                if (!(/^:/).test(pseudoClass)) {
                    pseudoClass = ':' + pseudoClass;
                }
                ss.insertRule('html' + pseudoClass + '{}', 0);
                ss.deleteRule(0);
                return true;
            } catch(e) {
                return false;
            }
        };

        // Run the test
        return testPseudo();

    };

})(UTIL, jQuery);
