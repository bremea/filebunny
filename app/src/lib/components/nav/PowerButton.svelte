<script lang="ts">
	import { RiShutDownLine } from 'svelte-remixicon';

	export let active: boolean = false;
</script>

<button
	class="group focus:ring-white focus:ring-4 cursor-pointer w-16 h-16 flex items-center justify-center"
>
	<RiShutDownLine
		size="36"
		class={`${active ? 'text-aquamarine aquaGlow' : 'text-gray-400'} group-hover:text-ruddy-blue group-focus:text-ruddy-blue transition-all`}
	/>
</button>
