<script lang="ts">
	export let onInput = () => {};
	export let value = '';
	export let placeholder = '';
	export let center = false;
	export let id: string;
</script>

<div class="w-full space-y-1">
	<label for={id} class="p-2"><slot /></label>
	<input
		class={`${
			center ? 'text-center' : 'text-left'
		} w-full px-4 py-1 rounded-full bg-night border-2 border-night focus:border-aquamarine transition-all`}
		bind:value
		{id}
		{placeholder}
		on:input={onInput}
	/>
</div>
