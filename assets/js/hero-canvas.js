/* =============================================================
   hero-canvas.js
   Animated data-themed hero background: drifting data points
   connected by faint lines, plus a slowly drawing line chart.
   - Honors prefers-reduced-motion (renders one static frame)
   - Pauses when the hero scrolls off-screen
   ============================================================= */
(function () {
	'use strict';

	var canvas = document.getElementById('hero-canvas');
	if (!canvas) return;

	var ctx = canvas.getContext('2d');
	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var dpr = Math.min(window.devicePixelRatio || 1, 2);
	var W = 0, H = 0;
	var points = [];
	var running = false;
	var rafId = null;

	var CYAN = '103,232,249';
	var TEAL = '94,234,212';
	var LINK_DIST = 150;

	// Slowly drawing line-chart polyline
	var chart = { xs: [], ys: [], progress: 0, speed: 0.0016 };

	function resize() {
		var rect = canvas.parentElement.getBoundingClientRect();
		W = rect.width;
		H = rect.height;
		canvas.width = Math.round(W * dpr);
		canvas.height = Math.round(H * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		initPoints();
		initChart();
	}

	function initPoints() {
		var count = Math.min(70, Math.max(30, Math.floor(W / 22)));
		points = [];
		for (var i = 0; i < count; i++) {
			points.push({
				x: Math.random() * W,
				y: Math.random() * H,
				vx: (Math.random() - 0.5) * 0.35,
				vy: (Math.random() - 0.5) * 0.35,
				r: 1 + Math.random() * 1.8
			});
		}
	}

	function initChart() {
		var n = 9;
		chart.xs = [];
		chart.ys = [];
		var baseY = H * 0.72;
		for (var i = 0; i <= n; i++) {
			chart.xs.push((W / n) * i);
			// Wandering upward trend, like a stock chart
			chart.ys.push(baseY - (i / n) * H * 0.28 + (Math.random() - 0.5) * H * 0.14);
		}
		chart.progress = 0;
	}

	function drawChart(progress) {
		var total = chart.xs.length - 1;
		var reach = progress * total;
		var full = Math.floor(reach);
		ctx.beginPath();
		ctx.moveTo(chart.xs[0], chart.ys[0]);
		for (var i = 1; i <= full && i <= total; i++) {
			ctx.lineTo(chart.xs[i], chart.ys[i]);
		}
		if (full < total) {
			var t = reach - full;
			ctx.lineTo(
				chart.xs[full] + (chart.xs[full + 1] - chart.xs[full]) * t,
				chart.ys[full] + (chart.ys[full + 1] - chart.ys[full]) * t
			);
		}
		ctx.strokeStyle = 'rgba(' + TEAL + ',0.28)';
		ctx.lineWidth = 2;
		ctx.lineJoin = 'round';
		ctx.stroke();

		// Vertices drawn so far
		for (var j = 0; j <= full && j <= total; j++) {
			ctx.beginPath();
			ctx.arc(chart.xs[j], chart.ys[j], 3, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(' + TEAL + ',0.4)';
			ctx.fill();
		}
	}

	function drawFrame(animate) {
		ctx.clearRect(0, 0, W, H);

		// Connecting lines
		for (var i = 0; i < points.length; i++) {
			for (var j = i + 1; j < points.length; j++) {
				var dx = points[i].x - points[j].x;
				var dy = points[i].y - points[j].y;
				var dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < LINK_DIST) {
					ctx.beginPath();
					ctx.moveTo(points[i].x, points[i].y);
					ctx.lineTo(points[j].x, points[j].y);
					ctx.strokeStyle = 'rgba(' + CYAN + ',' + (0.09 * (1 - dist / LINK_DIST)) + ')';
					ctx.lineWidth = 1;
					ctx.stroke();
				}
			}
		}

		// Data points
		for (var k = 0; k < points.length; k++) {
			var p = points[k];
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(' + CYAN + ',0.35)';
			ctx.fill();

			if (animate) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
				if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
			}
		}

		drawChart(chart.progress);
		if (animate) {
			chart.progress += chart.speed;
			if (chart.progress > 1.35) { initChart(); } // brief hold, then redraw a new trend
		}
	}

	function loop() {
		if (!running) return;
		drawFrame(true);
		rafId = requestAnimationFrame(loop);
	}

	function start() {
		if (running || reducedMotion) return;
		running = true;
		rafId = requestAnimationFrame(loop);
	}

	function stop() {
		running = false;
		if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
	}

	resize();

	if (reducedMotion) {
		chart.progress = 1;
		drawFrame(false);
	} else {
		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
			}, { threshold: 0 }).observe(canvas);
		} else {
			start();
		}
	}

	var resizeTimer;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			resize();
			if (reducedMotion) { chart.progress = 1; drawFrame(false); }
		}, 150);
	});
})();
