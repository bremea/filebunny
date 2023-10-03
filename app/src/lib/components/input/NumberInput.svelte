<script lang="ts">
	export let onInput = () => {};
	export let value = 0;
	export let center = false;
	export let id: string;
	export let max = 100000;
	export let min = -100000;
</script>

<div class="w-full space-y-1">
	<label for={id} class="p-2"><slot /></label>
	<input
		class={`${
			center ? 'text-center' : 'text-left'
		} w-full px-4 py-1 rounded-full border-2 border-night bg-night focus:border-aquamarine transition-all`}
		bind:value
		type="number"
		{id}
		{max}
		{min}
		on:input={onInput}
	/>
</div>
