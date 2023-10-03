/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'eerie-black': '#1E1F1F',
				night: '#141515',
				jet: '#282A2A',
				'outer-space': '#464949',
				aquamarine: '#B5FFE9',
				'ruddy-blue': '#71A9F7',
				'ultra-violet': '#F899FF',
				'bright-pink': '#E76D83'
			},
			spacing: {
				popout: '32rem'
			}
		}
	},
	safelist: [
		'group-hover:text-aquamarine',
		'group-hover:text-ruddy-blue',
		'group-hover:text-ultra-violet',
		'group-hover:fill-aquamarine',
		'group-hover:fill-ruddy-blue',
		'group-hover:fill-ultra-violet'
	],
	plugins: []
};
