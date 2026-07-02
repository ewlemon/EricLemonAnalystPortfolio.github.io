/* =============================================================
   portfolio.js
   All interactive behavior for Eric Lemon's analyst portfolio:
   project data, skill panel rendering, theme toggle, scroll
   effects, typed hero phrases, mini-chart, degree tracker.
   ============================================================= */


// ═══════════════════════════════════════════════════════════
//  PROJECT DATA
// ═══════════════════════════════════════════════════════════
const SKILL_DATA = {

	sql: {
		label: 'SQL',
		icon: 'fa-solid fa-database',
		accentColor: '#0891b2',
		accentColor2: '#0d9488',
		projects: [
			{
				title: 'Business SQL Project',
				desc: 'Six tables and roughly 98K rows of raw SaaS exports, cleaned through a staging ETL pipeline and mined for customer lifetime value, churn by plan tier, and a 5.6% pipeline win rate.',
				url: 'https://github.com/ewlemon/Business-SQL-Project/blob/main/README.md',
				ticon: 'fa-solid fa-building'
			},
			{
				title: 'Crime Data SQL Project',
				desc: 'A full SQL pipeline on LAPD crime data, cleaning up inconsistent formatting, missing fields, and duplicates before surfacing patterns in crime frequency, time-of-day clustering, and district-level variation.',
				url: 'https://github.com/ewlemon/SQL-Project-5/blob/main/SQLProject5.sql',
				ticon: 'fa-solid fa-handcuffs'
			},
			{
				title: 'Chronic Diseases SQL',
				desc: 'Cleans and standardizes U.S. chronic disease indicators to surface actionable public-health insights across states and demographics.',
				url: 'https://github.com/ewlemon/SQL-Project-4/blob/main/SQLProject4.sql',
				ticon: 'fa-solid fa-heart-pulse'
			},
			{
				title: 'Northwind SQL Project',
				desc: 'End-to-end workflow building cleaned, structured tables used to power an interactive Tableau business performance dashboard.',
				url: 'https://github.com/ewlemon/SQL-Project-3/blob/main/Project%206%20Data.sqbpro',
				ticon: 'fa-solid fa-store'
			}
		]
	},

	python: {
		label: 'Python',
		icon: 'fa-brands fa-python',
		accentColor: '#d97706',
		accentColor2: '#b45309',
		projects: [
			{
				title: 'U.S. Stock Market Index Analysis',
				desc: 'Five major U.S. indexes modeled with Linear, Ridge, Lasso, and Polynomial regression, kept current by a GitHub Actions pipeline that refreshes the data every day.',
				url: 'https://github.com/ewlemon/Stock-Project',
				ticon: 'fa-solid fa-arrow-trend-up'
			},
			{
				title: 'Exploratory Analysis',
				desc: 'Pandas and NumPy analysis of global population trends with Matplotlib and Seaborn visualizations.',
				url: 'https://github.com/ewlemon/Python-Pandas/blob/main/PandasExploratoryAnalysis1.ipynb',
				ticon: 'fa-solid fa-earth-americas'
			},
			{
				title: 'Library Exploration',
				desc: 'Jupyter Notebook demonstrating data manipulation and visualization across Pandas, NumPy, Matplotlib, and Seaborn.',
				url: 'https://github.com/ewlemon/Python-Files/blob/main/Basics9(MatPlotLib).ipynb',
				ticon: 'fa-solid fa-book-open'
			},
			{
				title: 'Analysis Case Study',
				desc: 'Internship assessment analyzing workforce absenteeism, engagement surveys, and consultant utilization across multiple datasets.',
				url: 'https://github.com/ewlemon/Analysis-Case-Study',
				ticon: 'fa-solid fa-briefcase'
			}
		]
	},

	r: {
		label: 'R',
		icon: 'fa-brands fa-r-project',
		accentColor: '#276dc3',
		accentColor2: '#1a4f8a',
		projects: [
			{
				title: 'Crime Data R Project',
				desc: 'An R script that cleans LAPD crime data with dplyr and lubridate, then builds a full set of ggplot2 charts, from time-series trends to demographic breakdowns.',
				url: 'https://github.com/ewlemon/R-Project-1/blob/main/Crime_Data.R',
				ticon: 'fa-solid fa-shield-halved'
			}
		]
	},

	tableau: {
		label: 'Tableau',
		icon: 'fa-solid fa-chart-bar',
		accentColor: '#e97627',
		accentColor2: '#c75b1e',
		projects: [
			{
				title: 'Career Trends Dashboard',
				desc: 'Interactive 10-year career outlooks: annual openings, growth, turnover, wages, and required education, with filters designed to be hard to misread.',
				url: 'https://public.tableau.com/app/profile/eric.lemon/viz/LemonAssignmentFinal/Dashboard',
				ticon: 'fa-solid fa-briefcase'
			},
			{
				title: 'HR Analytics Dashboard',
				desc: 'Workforce trends, retention risks, and role distribution built from a synthetic HR dataset with a clean summary-to-detail navigation flow.',
				url: 'https://public.tableau.com/app/profile/eric.lemon/viz/Project8_17527841417050/HRSummary',
				ticon: 'fa-solid fa-users'
			},
			{
				title: 'Covid-19 Dashboard',
				desc: 'National COVID-19 trends through April 2021: cases, mortality, and regional comparisons in a single interactive view.',
				url: 'https://public.tableau.com/app/profile/eric.lemon/viz/Project9_17550177343090/Dashboard',
				ticon: 'fa-solid fa-virus-covid'
			},
			{
				title: 'AirHelp Score Dashboard',
				desc: 'Global airport performance ranked by service quality and on-time metrics using AirHelp scoring data.',
				url: 'https://public.tableau.com/app/profile/eric.lemon/viz/Project7_17515896957860/Dashboard1',
				ticon: 'fa-solid fa-plane-departure'
			}
		]
	},

	excel: {
		label: 'Excel',
		icon: 'fa-solid fa-file-excel',
		accentColor: '#217346',
		accentColor2: '#155633',
		projects: [
			{
				title: 'Decision Analytics Excel Problems',
				desc: 'Over 25 optimization problems solved with Excel Solver, covering linear programming, integer programming, and resource allocation in realistic business scenarios.',
				url: 'https://github.com/ewlemon/Excel-Project-2/blob/main/DecisionAnalysisProblems.xlsx',
				ticon: 'fa-solid fa-sliders'
			},
			{
				title: 'Business Analytics Problems',
				desc: 'Regression analysis and optimization modeling with structured problem-solving documentation throughout.',
				url: 'https://github.com/ewlemon/Excel-Project-3/blob/main/BusinessAnalysisProblems.xlsx',
				ticon: 'fa-solid fa-calculator'
			},
			{
				title: 'Stock Market Analysis',
				desc: 'Auto-updating Excel workbook refreshed daily via a GitHub Actions Python pipeline with no manual updates needed.',
				url: 'https://github.com/ewlemon/Stock-Project',
				ticon: 'fa-solid fa-arrow-trend-up'
			}
		]
	},

	databricks: {
		label: 'Databricks',
		icon: 'fa-solid fa-fire-flame-curved',
		accentColor: '#d92e1c',
		accentColor2: '#a82115',
		projects: [
			{
				title: 'CO\u2082 Emissions Dashboard',
				desc: 'A cloud-native Databricks dashboard on 2023 U.S. CO\u2082 emissions, built with SQL transformations on Lakehouse architecture so a non-technical audience can actually use it.',
				url: 'https://dbc-775b9b39-494b.cloud.databricks.com/dashboardsv3/01f0d06b765a15b2bb4cf0e9fe562483/published?o=1864074656503127',
				ticon: 'fa-solid fa-smog'
			}
		]
	},

	ai: {
    label: 'AI (Claude / ChatGPT)',
    icon: 'fa-solid fa-robot',
    accentColor: '#7c5cd6',
    accentColor2: '#6b46c1',
    projects: [
        {
            title: 'AI Analyst Copilot Agent',
            desc: 'A live Streamlit agent on the Claude API that answers plain-English business questions by writing its own read-only SQL, charting the results, and showing every query it ran.',
            url: 'https://github.com/ewlemon/analyst-copilot-agent',
            ticon: 'fa-solid fa-robot'
        },
        {
            title: 'Interactive SQL Practice Website',
            desc: 'A deployed, interactive SQL practice site built with Claude AI: realistic schemas and business-style questions that reward analytical thinking over syntax recall.',
            url: 'https://sql-practice-two.vercel.app/',
            ticon: 'fa-solid fa-laptop-code'
        }
    ]
},

};


// ═══════════════════════════════════════════════════════════
//  RENDER & TOGGLE SKILL PANEL
// ═══════════════════════════════════════════════════════════
let activePill = null;

function renderSkillPanel(skillKey) {
	const data  = SKILL_DATA[skillKey];
	const inner = document.getElementById('scp-inner');

	inner.innerHTML = `
		<div class="scp-header">
			<span class="scp-header-label">
				<i class="${data.icon}"></i>&nbsp;${data.label} Projects
			</span>
			<button class="scp-close" id="scp-close-btn" aria-label="Close panel">
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
		<div class="scp-others">
			<div class="scp-others-grid">
				${data.projects.map(p => `
					<a href="${p.url}" target="_blank" rel="noopener" class="scp-other-card">
						<span class="scp-thumb" style="--tile-accent:${data.accentColor};">
							<i class="${p.ticon || data.icon}"></i>
						</span>
						<span class="scp-other-body">
							<span class="scp-other-title">${p.title}</span>
							<span class="scp-other-desc">${p.desc}</span>
							<span class="scp-other-link">
								<i class="fa-solid fa-arrow-right"></i> Open project
							</span>
						</span>
					</a>`).join('')}
			</div>
		</div>`;

	document.getElementById('scp-close-btn').addEventListener('click', closePanel);
}

function openPanel(skillKey) {
	renderSkillPanel(skillKey);
	const panel = document.getElementById('skill-content-panel');
	panel.classList.add('scp-open');
	setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
}

function closePanel() {
	document.getElementById('skill-content-panel').classList.remove('scp-open');
	if (activePill) {
		activePill.classList.remove('sp-active');
		activePill.setAttribute('aria-expanded', 'false');
		activePill = null;
	}
}

document.querySelectorAll('.skill-pill.has-projects').forEach(pill => {
	function handleToggle() {
		const skillKey = pill.dataset.skill;
		const isActive = pill.classList.contains('sp-active');
		document.querySelectorAll('.skill-pill.has-projects.sp-active').forEach(p => {
			p.classList.remove('sp-active');
			p.setAttribute('aria-expanded', 'false');
		});
		if (isActive) {
			closePanel();
		} else {
			pill.classList.add('sp-active');
			pill.setAttribute('aria-expanded', 'true');
			activePill = pill;
			openPanel(skillKey);
		}
	}
	pill.addEventListener('click', handleToggle);
	pill.addEventListener('keydown', e => {
		if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); }
	});
});


// ═══════════════════════════════════════════════════════════
//  STANDARD PAGE JS
// ═══════════════════════════════════════════════════════════

const body   = document.body;
const toggle = document.getElementById('dark-toggle');
const icon   = document.getElementById('dark-icon');
function applyTheme(dark) {
	body.classList.toggle('dark', dark);
	icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
	localStorage.setItem('theme', dark ? 'dark' : 'light');
}
applyTheme(localStorage.getItem('theme') === 'dark');
toggle.addEventListener('click', () => applyTheme(!body.classList.contains('dark')));

window.addEventListener('load', () => {
	document.getElementById('page-loader').classList.add('loaded');
	setTimeout(() => {
		const h = document.getElementById('header');
		if (h) h.classList.add('loaded');
	}, 100);
});

const fadeObs = new IntersectionObserver((entries, obs) => {
	entries.forEach(e => {
		if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
	});
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

function countUp(el, target, suffix, duration) {
	let start = 0;
	const step = target / (duration / 16);
	const timer = setInterval(() => {
		start += step;
		if (start >= target) { start = target; clearInterval(timer); }
		el.textContent = Math.floor(start) + suffix;
	}, 16);
}
const statsObs = new IntersectionObserver((entries, obs) => {
	entries.forEach(e => {
		if (e.isIntersecting) {
			document.querySelectorAll('.stat-number[data-target]').forEach(el => {
				const target = el.dataset.target;
				if (!target) return;
				countUp(el, parseInt(target), el.dataset.suffix || '', 1200);
			});
			obs.unobserve(e.target);
		}
	});
}, { threshold: 0.4 });
const statsSection = document.getElementById('stats-section');
if (statsSection) statsObs.observe(statsSection);

document.querySelectorAll('.nav-links a').forEach(a => {
	a.addEventListener('click', e => {
		const href = a.getAttribute('href');
		if (href.startsWith('#')) {
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
				document.querySelector('.nav-links').classList.remove('open');
			}
		}
	});
});

const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const scrollSpy = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			navLinks.forEach(link => {
				link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
			});
		}
	});
}, { threshold: 0.4 });
sections.forEach(s => scrollSpy.observe(s));

document.getElementById('nav-toggle').addEventListener('click', () => {
	document.querySelector('.nav-links').classList.toggle('open');
});

const scrollBtn = document.getElementById('scroll-top');
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
	scrollBtn.classList.toggle('visible', window.scrollY > 400);
	const scrollable = document.documentElement.scrollHeight - window.innerHeight;
	if (progressBar && scrollable > 0) {
		progressBar.style.width = Math.min(100, (window.scrollY / scrollable) * 100) + '%';
	}
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// ═══════════════════════════════════════════════════════════
//  ROTATING TYPED PHRASES (hero) — centered on its own line
// ═══════════════════════════════════════════════════════════
(function() {
	const el = document.getElementById('typed-word');
	if (!el) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // keep static first phrase

	const phrases = [
		'Every dataset has a story to tell',
		'I find the "why" behind the numbers',
		'Curious by nature, analytical by training',
		'Good decisions start with good questions',
		'Making data feel a little less messy'
	];
	let idx = 0, chars = phrases[0].length, deleting = true;

	function tick() {
		if (deleting) {
			chars--;
			el.textContent = phrases[idx].slice(0, chars);
			if (chars === 0) {
				deleting = false;
				idx = (idx + 1) % phrases.length;
				setTimeout(tick, 400);
				return;
			}
			setTimeout(tick, 34);
		} else {
			chars++;
			el.textContent = phrases[idx].slice(0, chars);
			if (chars === phrases[idx].length) {
				deleting = true;
				setTimeout(tick, 2600);
				return;
			}
			setTimeout(tick, 62);
		}
	}
	setTimeout(tick, 2600);
})();


// ═══════════════════════════════════════════════════════════
//  MINI-CHART: animate bars on scroll + click-through to skills
// ═══════════════════════════════════════════════════════════
(function() {
	const chart = document.getElementById('mini-chart');
	if (!chart) return;

	new IntersectionObserver((entries, obs) => {
		entries.forEach(e => {
			if (e.isIntersecting) { chart.classList.add('mc-on'); obs.unobserve(chart); }
		});
	}, { threshold: 0.35 }).observe(chart);

	chart.querySelectorAll('.mc-row').forEach(row => {
		function activate() {
			const pill = document.querySelector(`.skill-pill.has-projects[data-skill="${row.dataset.skill}"]`);
			if (pill && !pill.classList.contains('sp-active')) pill.click();
			else if (pill) pill.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
		row.addEventListener('click', activate);
		row.addEventListener('keydown', e => {
			if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
		});
	});
})();


// ═══════════════════════════════════════════════════════════
//  DEGREE PROGRESS TRACKER: fill on scroll
// ═══════════════════════════════════════════════════════════
(function() {
	const dp = document.getElementById('degree-progress');
	if (!dp) return;
	new IntersectionObserver((entries, obs) => {
		entries.forEach(e => {
			if (e.isIntersecting) { dp.classList.add('dp-on'); obs.unobserve(dp); }
		});
	}, { threshold: 0.6 }).observe(dp);
})();

(function() {
	const el = document.getElementById('gmail-link');
	if (el) el.href = 'mailto:' + 'ewlemon7' + '@' + 'gmail.com';
})();


// ═══════════════════════════════════════════════════════════
//  3D TILT on featured cards (pointer devices only)
// ═══════════════════════════════════════════════════════════
(function() {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

	const MAX_DEG = 3.5;
	document.querySelectorAll('.tilt-card').forEach(card => {
		card.addEventListener('mousemove', e => {
			if (card.classList.contains('fc-open')) return; // no tilt while an embed is open
			const r = card.getBoundingClientRect();
			const px = (e.clientX - r.left) / r.width - 0.5;
			const py = (e.clientY - r.top) / r.height - 0.5;
			card.style.transform = `perspective(900px) rotateY(${px * MAX_DEG}deg) rotateX(${-py * MAX_DEG}deg)`;
		});
		card.addEventListener('mouseleave', () => { card.style.transform = ''; });
	});
})();


// ═══════════════════════════════════════════════════════════
//  FEATURED CARDS: expand to show the live embed (lazy-loaded)
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('.fc-expand').forEach(btn => {
	btn.addEventListener('click', () => {
		const card = btn.closest('.featured-card');
		const panel = card.querySelector('.fc-embed-panel');
		const inner = card.querySelector('.fc-embed-inner');
		const open = card.classList.toggle('fc-open');
		btn.setAttribute('aria-expanded', open);
		card.style.transform = '';

		if (open) {
			if (!inner.dataset.loaded) {
				inner.dataset.loaded = '1';
				const wrap = document.createElement('div');
				wrap.className = 'scp-embed-wrap fc-embed-wrap';
				wrap.innerHTML = `<iframe src="${card.dataset.embedSrc}" height="${card.dataset.embedHeight}"
					${card.dataset.embedExtra || ''} frameborder="0"></iframe>`;
				const frame = wrap.querySelector('iframe');
				frame.addEventListener('load', () => wrap.classList.add('embed-loaded'));
				setTimeout(() => wrap.classList.add('embed-loaded'), 8000);
				inner.appendChild(wrap);
			}
			btn.querySelector('.fc-expand-label').textContent = btn.dataset.hideLabel;
			setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 180);
		} else {
			btn.querySelector('.fc-expand-label').textContent = btn.dataset.showLabel;
		}
	});
});


// ═══════════════════════════════════════════════════════════
//  SPOTLIGHT hover on skill category cards
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('.skill-category').forEach(card => {
	card.addEventListener('mousemove', e => {
		const r = card.getBoundingClientRect();
		card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
		card.style.setProperty('--my', (e.clientY - r.top) + 'px');
	});
});


// ═══════════════════════════════════════════════════════════
//  CONTACT FORM: show confirmation after FormSubmit redirect
// ═══════════════════════════════════════════════════════════
(function() {
	if (!new URLSearchParams(location.search).has('sent')) return;
	const note = document.getElementById('cf-sent');
	if (note) note.hidden = false;
	history.replaceState(null, '', location.pathname + '#footer');
})();
