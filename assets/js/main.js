/* Dark Portfolio - 2026 */

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ]
	});

	// Play initial animations on page load
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Mobile detection
	if (browser.mobile) {
		$body.addClass('is-mobile');
	} else {
		breakpoints.on('>medium', function() {
			$body.removeClass('is-mobile');
		});

		breakpoints.on('<=medium', function() {
			$body.addClass('is-mobile');
		});
	}

	// Smooth scrolling for navigation links
	$('.scrolly').scrolly({
		speed: 1500,
		offset: 0
	});

	// Scroll Animations - Intersection Observer
	(function() {
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		};

		const observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					// Unobserve after animation to prevent re-triggering
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// Observe all fade-in elements
		document.querySelectorAll('.fade-in').forEach(function(element) {
			observer.observe(element);
		});
	})();

	// Update Current Year in Footer
	(function() {
		const yearElement = document.getElementById('current-year');
		if (yearElement) {
			yearElement.textContent = new Date().getFullYear();
		}
	})();

	// Add stagger animation delay to cards
	(function() {
		const projectCards = document.querySelectorAll('.project-card');
		projectCards.forEach(function(card, index) {
			card.style.transitionDelay = (index * 100) + 'ms';
		});

		const blogCards = document.querySelectorAll('.blog-card');
		blogCards.forEach(function(card, index) {
			card.style.transitionDelay = (index * 100) + 'ms';
		});

		const skillCards = document.querySelectorAll('.skill-card');
		skillCards.forEach(function(card, index) {
			card.style.transitionDelay = (index * 100) + 'ms';
		});
	})();

	// Animate stats on scroll
	(function() {
		const stats = document.querySelectorAll('.stat-value');
		let animated = false;

		const animateStats = function() {
			if (animated) return;
			
			const statsContainer = document.querySelector('.stats-container');
			if (!statsContainer) return;

			const rect = statsContainer.getBoundingClientRect();
			const inView = rect.top < window.innerHeight && rect.bottom > 0;

			if (inView) {
				animated = true;
				stats.forEach(function(stat) {
					const text = stat.textContent;
					const hasPlus = text.includes('+');
					const hasPercent = text.includes('%');
					const hasM = text.includes('M');
					
					let target = parseInt(text.replace(/\D/g, ''));
					let current = 0;
					const increment = target / 50;
					const duration = 1500;
					const stepTime = duration / 50;

					const counter = setInterval(function() {
						current += increment;
						if (current >= target) {
							current = target;
							clearInterval(counter);
						}
						
						let display = Math.floor(current).toString();
						if (hasM) display += 'M';
						if (hasPlus) display += '+';
						if (hasPercent) display += '%';
						
						stat.textContent = display;
					}, stepTime);
				});
			}
		};

		window.addEventListener('scroll', animateStats);
		animateStats(); // Check on load
	})();

	// Smooth scroll indicator bounce on hero
	(function() {
		const scrollIndicator = document.querySelector('.scroll-indicator');
		if (scrollIndicator) {
			scrollIndicator.addEventListener('click', function() {
				const portfolioSection = document.getElementById('portfolio');
				if (portfolioSection) {
					portfolioSection.scrollIntoView({ behavior: 'smooth' });
				}
			});
		}
	})();

	// Add hover effect for project cards - cursor pointer
	(function() {
		const cards = document.querySelectorAll('.project-card, .blog-card');
		cards.forEach(function(card) {
			card.style.cursor = 'pointer';
			
			// Make entire card clickable if it has a link
			const link = card.querySelector('.card-link');
			if (link) {
				card.addEventListener('click', function(e) {
					// Don't trigger if clicking on the link itself
					if (e.target.closest('.card-link')) return;
					link.click();
				});
			}
		});
	})();

})(jQuery);
