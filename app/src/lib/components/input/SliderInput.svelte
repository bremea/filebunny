<script lang="ts">
	export let onInput = () => {};
	export let value = 0;
	export let id: string;
	export let max = 100000;
	export let min = -100000;
	export let sliderText: string = '1000 GB';
</script>

<div class="w-full space-y-1 pr-16">
	<label for={id} class="p-2"><slot /></label>
	<div class="w-full relative flex pl-2">
		<input
			class="w-full rounded-full border-2 accent-aquamarine border-night bg-night focus:border-aquamarine transition-all"
			bind:value
			type="range"
			{id}
			{max}
			{min}
			on:input={onInput}
		/>
		<div class="w-32 absolute -right-32 pl-2 pt-px">
			<p class="text-left text-sm">{sliderText}</p>
		</div>
	</div>
</div>
