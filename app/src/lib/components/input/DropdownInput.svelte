<script lang="ts">
	import {RiArrowDropDownLine} from 'svelte-remixicon';

	export let onInput = () => {};
	export let value = 0;
	export let center = false;
	export let id: string;
	export let options: string[];
</script>

<div class="w-full space-y-1">
	<label class="whitespace-nowrap p-2" for={id}><slot /></label>
	<div class="relative flex items-center">
		<select
			class={`appearance-none ${
				center ? 'text-center' : 'text-left'
			} w-full px-4 py-1 rounded-full border-2 border-night bg-night focus:border-aquamarine transition-all`}
			{id}
			on:input={onInput}
			bind:value
		>
			{#each options as option, i}
				<option value={i}>{option}</option>
			{/each}
		</select>
		<RiArrowDropDownLine class="absolute right-4 pointer-events-none" size="24" />
	</div>
</div>
