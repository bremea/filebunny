<script lang="ts">
	import { RiFileDownloadLine, RiLinkM, RiSettings3Line } from 'svelte-remixicon';

	export let item: number;
	export let active: boolean = false;

	const elements = [RiLinkM, RiFileDownloadLine, RiSettings3Line];
	const textColors = [
		'text-aquamarine',
		'text-ruddy-blue',
		'text-ultra-violet'
	];
	const iconColors = [
		'fill-aquamarine',
		'fill-ruddy-blue',
		'fill-ultra-violet'
	];
	const text = ['links', 'files', 'settings'];
</script>

<button
	class={`group w-full focus:ring-white focus:ring-2 cursor-pointer pr-2 flex items-center relative transition-all px-4 py-2 hover:bg-white hover:bg-opacity-10 ${active ? 'bg-white bg-opacity-20' : ''}`}
>
	<svelte:component this={elements[item]} size="24" class={`${'group-hover:' + iconColors[item]} align-baseline transition-all ${active ? iconColors[item] : ''}`} />
	<p class={`${'group-hover:' + textColors[item]} ${active ? 'font-bold' : 'font-normal'} transition-all ml-2 ${active ? textColors[item] : ''}`}>{text[item]}</p>
</button>
