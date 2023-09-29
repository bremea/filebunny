<script lang="ts">
	export let onInput = () => {};
	export let value = '';
	export let placeholder = '';
	export let center = false;
	export let id: string;
</script>

<div class="w-full space-y-1">
	<label for={id} class="p-4"><slot /></label>
	<input
		class={`${
			center ? 'text-center' : 'text-left'
		} w-full px-4 py-1 rounded-full bg-transparent border-2 border-outer-space focus:border-aquamarine focus:bg-outer-space hover:bg-outer-space transition-all`}
		bind:value
		{id}
		{placeholder}
		on:input={onInput}
	/>
</div>
