/* Project Portfolio Data */

// Icon SVG paths for different project types
const ICONS = {
	ANDROID: `
		<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
		<line x1="12" y1="18" x2="12.01" y2="18"></line>
	`,
	SDK: `
		<circle cx="12" cy="12" r="10"></circle>
		<line x1="2" y1="12" x2="22" y2="12"></line>
		<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
	`,
	WEB: `
		<circle cx="12" cy="12" r="10"></circle>
		<line x1="2" y1="12" x2="22" y2="12"></line>
		<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
	`,
	IOS: `
		<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
		<line x1="12" y1="18" x2="12.01" y2="18"></line>
	`
};

// Projects data array - Add your projects here!
const PROJECTS_DATA = [
	{
		category: 'ANDROID',
		icon: ICONS.ANDROID,
		title: 'Checkatrade Consumer',
		description: 'Home improvement app connecting users with 100k+ vetted tradespeople for trusted home services.',
		tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Coroutines'],
		link: '#'
	},
	{
		category: 'ANDROID',
		icon: ICONS.ANDROID,
		title: 'TradeMore',
		description: 'AI-powered job management platform helping tradespeople streamline their business operations.',
		tags: ['Kotlin', 'AI Integration', 'Material Design 3'],
		link: '#'
	},
	{
		category: 'SDK',
		icon: ICONS.SDK,
		title: 'ComplyCube SDK',
		description: 'Identity verification & KYC/AML compliance SDK with PAD Level 2 liveness detection for secure authentication.',
		tags: ['Kotlin', 'Camera2 API', 'ML Kit', 'SDK Development'],
		link: '#'
	},
	{
		category: 'ANDROID',
		icon: ICONS.ANDROID,
		title: 'NYOUM (Love)',
		description: 'Privacy-first AI communication platform featuring real-time transcription and intelligent assistance.',
		tags: ['Kotlin', 'WebRTC', 'AI/ML', 'Real-time Processing'],
		link: 'https://play.google.com/store/apps/details?id=com.nyoum.android.love'
	},
	{
		category: 'ANDROID',
		icon: ICONS.ANDROID,
		title: 'TV Guide Mobile',
		description: 'Entertainment discovery app for live TV and streaming with 1M+ active users worldwide.',
		tags: ['Java', 'Kotlin', 'ExoPlayer', 'REST APIs'],
		link: 'https://play.google.com/store/apps/details?id=com.tvguidemobile'
	},
	{
		category: 'ANDROID',
		icon: ICONS.ANDROID,
		title: 'CNET',
		description: '#1 tech news and product review platform delivering trusted technology insights to millions.',
		tags: ['Kotlin', 'Retrofit', 'Room', 'Material Design'],
		link: 'https://play.google.com/store/apps/details?id=com.cbsinteractive.cnet'
	},
	{
		category: 'ANDROID',
		icon: ICONS.ANDROID,
		title: 'GameSpot',
		description: 'Premier gaming news and reviews platform keeping gamers informed with the latest industry coverage.',
		tags: ['Kotlin', 'Retrofit', 'MVVM'],
		link: 'https://play.google.com/store/apps/details?id=com.cbsinteractive.gamespot.tt'
	}
];
