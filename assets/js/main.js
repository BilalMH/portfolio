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
		speed: 800,
		easing: 'linear',
		offset: 0
	});

	// Scroll Animations - Intersection Observer
	const scrollAnimationObserver = (function() {
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

		// Observe all existing fade-in elements
		document.querySelectorAll('.fade-in').forEach(function(element) {
			observer.observe(element);
		});
		
		// Return observer so it can be used for dynamic elements
		return observer;
	})();

	// Update Current Year in Footer
	(function() {
		const yearElement = document.getElementById('current-year');
		if (yearElement) {
			yearElement.textContent = new Date().getFullYear();
		}
	})();

	// Populate Projects Grid from Data
	(function() {
		console.log('🔍 Attempting to load projects...');
		
		const projectGrid = document.querySelector('.project-grid');
		console.log('📋 Project grid element:', projectGrid);
		console.log('📦 PROJECTS_DATA defined:', typeof PROJECTS_DATA !== 'undefined');
		
		if (!projectGrid) {
			console.error('❌ Project grid element not found!');
			return;
		}
		
		if (typeof PROJECTS_DATA === 'undefined') {
			console.error('❌ PROJECTS_DATA is not defined! Check if projects-data.js is loaded.');
			return;
		}
		
		console.log(`📊 Found ${PROJECTS_DATA.length} projects to display`);
		
		// Clear existing content (like the comment)
		projectGrid.innerHTML = '';
		
		PROJECTS_DATA.forEach((project, index) => {
			// Create project card
			const card = document.createElement('article');
			card.className = 'project-card fade-in';
			card.style.transitionDelay = (index * 100) + 'ms';
			
			// Create tags HTML with individual tag elements
			const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
			
			// Build card HTML
			card.innerHTML = `
				<div class="card-header">
					<div class="card-meta">
						<div class="card-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								${project.icon}
							</svg>
						</div>
						<div class="card-category">${project.category}</div>
					</div>
					<a href="${project.link}" class="card-link" target="_blank" rel="noopener noreferrer">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
							<polyline points="15 3 21 3 21 9"></polyline>
							<line x1="10" y1="14" x2="21" y2="3"></line>
						</svg>
					</a>
				</div>
				<h3 class="card-title">${project.title}</h3>
				<p class="card-description">${project.description}</p>
				<div class="card-tags">${tagsHtml}</div>
			`;
			
			// Append to grid
			projectGrid.appendChild(card);
			
			// Observe the card for scroll animation
			if (typeof scrollAnimationObserver !== 'undefined') {
				scrollAnimationObserver.observe(card);
			}
		});
		
		console.log(`✅ Successfully loaded ${PROJECTS_DATA.length} projects into the grid`);
	})();

	// Add stagger animation delay to cards
	(function() {
		// Note: Project cards are handled in the population function above
		
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
		// Use event delegation for dynamically added project cards
		document.addEventListener('mouseover', function(e) {
			if (e.target.closest('.project-card') || e.target.closest('.blog-card')) {
				const card = e.target.closest('.project-card') || e.target.closest('.blog-card');
				card.style.cursor = 'pointer';
			}
		});
		
		// Click handler for cards
		document.addEventListener('click', function(e) {
			const card = e.target.closest('.project-card') || e.target.closest('.blog-card');
			if (card) {
				// Don't trigger if clicking on the link itself
				if (e.target.closest('.card-link')) return;
				
				const link = card.querySelector('.card-link') || card.querySelector('a');
				if (link) {
					// If it's a blog card with dynamic listener, the listener handles it
					// But for project cards, we need to manually trigger
					if (card.classList.contains('project-card')) {
						link.click();
					}
				}
			}
		});
	})();

	// Fetch and display latest Medium blog posts
	(function() {
		const MEDIUM_USERNAME = 'bilalcanc0de';
		const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;
		
		// Function to format date
		function formatDate(dateString) {
			const date = new Date(dateString);
			const options = { year: 'numeric', month: 'short', day: 'numeric' };
			return date.toLocaleDateString('en-US', options);
		}
		
		// Function to strip HTML tags and truncate description
		function getPlainTextDescription(html, maxLength = 150) {
			const temp = document.createElement('div');
			temp.innerHTML = html;
			let text = temp.textContent || temp.innerText || '';
			text = text.trim();
			if (text.length > maxLength) {
				text = text.substring(0, maxLength) + '...';
			}
			return text;
		}
		
		// Fetch Medium posts
		fetch(RSS_URL)
			.then(response => response.json())
			.then(data => {
				if (data.status === 'ok' && data.items && data.items.length > 0) {
					const posts = data.items.slice(0, 3); // Get latest 3 posts
					const blogCards = document.querySelectorAll('.blog-card');
					
					posts.forEach((post, index) => {
						if (blogCards[index]) {
							const card = blogCards[index];
							
							// Update blog title
							const titleElement = card.querySelector('.blog-title');
							if (titleElement) {
								titleElement.textContent = post.title;
							}
							
							// Update blog description
							const descElement = card.querySelector('.blog-description');
							if (descElement) {
								descElement.textContent = getPlainTextDescription(post.description);
							}
							
							// Update meta date
							const metaElement = card.querySelector('.blog-meta span');
							if (metaElement) {
								metaElement.textContent = formatDate(post.pubDate);
							}
							
							// Make card clickable
							card.style.cursor = 'pointer';
							card.addEventListener('click', function() {
								window.open(post.link, '_blank', 'noopener,noreferrer');
							});
							
							// Add a subtle hover effect indicator
							card.setAttribute('title', 'Read on Medium');
						}
					});
					
					console.log('✅ Successfully loaded Medium blog posts');
				}
			})
			.catch(error => {
				console.warn('⚠️ Could not fetch Medium posts, using fallback content:', error);
				// Fallback: Keep the static content that's already in the HTML
			});
	})();

})(jQuery);
