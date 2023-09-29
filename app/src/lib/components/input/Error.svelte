<script>
	import { RiAlertLine } from "svelte-remixicon";

	export let center = false;
	export let show = false;
</script>

<div class={`${show ? '' : 'hidden'} w-full px-3 py-1 rounded-full border-2 border-bright-pink flex ${center ? 'justify-center' : 'justify-start'}`}>
	<RiAlertLine class="mr-2 text-bright-pink" />
	<slot />
</div>
