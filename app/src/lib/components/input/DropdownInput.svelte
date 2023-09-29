<script lang="ts">
	import {RiArrowDropDownLine} from 'svelte-remixicon';

	export let onInput = () => {};
	export let value = 0;
	export let center = false;
	export let id: string;
	export let options: string[];
</script>

<div class="w-full space-y-1">
	<label for={id} class="p-4"><slot /></label>
	<div class="relative flex items-center">
		<select
			class={`appearance-none ${
				center ? 'text-center' : 'text-left'
			} w-full px-4 py-1 rounded-full bg-transparent border-2 border-outer-space focus:border-aquamarine focus:bg-outer-space hover:bg-outer-space transition-all`}
			{id}
			on:input={onInput}
			bind:value
		>
			{#each options as option, i}
				<option value={i}>{option}</option>
			{/each}
		</select>
		<RiArrowDropDownLine class="absolute right-4 pointer-events-none" size="16" />
	</div>
</div>
