/*
	Helios by HTML5 UP — simplified for Eric Lemon's portfolio.
	Original template: html5up.net | @ajlkn
	CCA 3.0 license (html5up.net/license)

	Retained: breakpoints setup, is-preload removal on load.
	Removed:  dropotron nav, scrolly, mobile nav panel, carousel hover-scroll logic.
	          All of those are now handled by custom inline JS or are no longer used.
*/

(function($) {

	var $window = $(window),
		$body   = $('body');

	// Breakpoints (used by the breakpoints.min.js helper)
	breakpoints({
		wide:     [ '1281px', '1680px' ],
		normal:   [ '961px',  '1280px' ],
		narrow:   [ '841px',  '960px'  ],
		narrower: [ '737px',  '840px'  ],
		mobile:   [ null,     '736px'  ]
	});

	// Remove the is-preload class once the page has fully loaded.
	// This re-enables CSS animations/transitions that were paused during load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

})(jQuery);