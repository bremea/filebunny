<script>
	import { RiCloseCircleLine } from 'svelte-remixicon';

	export let backLocation = '/';
</script>

<div class="flex items-center">
	<a href={backLocation}>
		<RiCloseCircleLine
			class="opacity-75 hover:opacity-100 transition-all cursor-pointer mr-4 mt-1"
			size="32"
		/>
	</a>
	<h1 class="leading-5"><slot /></h1>
</div>
