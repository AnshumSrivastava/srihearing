import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing blog post pages (they'll be 404s until Supabase is connected)
				if (path.startsWith('/blog/') && path !== '/blog') {
					return;
				}
				throw new Error(message);
			},
			handleMissingId: 'warn',
		}
	}
};

export default config;
