<script lang="ts">
	export let onInput = () => {};
	export let value = 0;
	export let id: string;
	export let max = 100000;
	export let min = -100000;
	export let sliderText: string = '1000 GB';
</script>

<div class="w-full space-y-1">
	<label for={id} class="p-4"><slot /></label>
	<div class="w-full relative flex">
		<input
			class="w-full mx-4 rounded-full bg-transparent border-2 accent-aquamarine border-outer-space focus:border-aquamarine focus:bg-outer-space hover:bg-outer-space transition-all"
			bind:value
			type="range"
			{id}
			{max}
			{min}
			on:input={onInput}
		/>
		<div class="w-32 absolute -right-32">
			<p class="text-left text-sm">{sliderText}</p>
		</div>
	</div>
</div>
