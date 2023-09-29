<script>
	export let onClick = () => {};
	export let center = false;
	export let disabled = false;
</script>

<button
	class={`${center ? 'justify-center' : 'justify-start'} ${
		$$restProps.class
	} ${disabled ? 'cursor-not-allowed opacity-50' : ''} flex cursor-pointer w-full px-3 py-1 rounded-full bg-transparent border-2 border-outer-space focus:border-aquamarine focus:bg-outer-space hover:bg-outer-space transition-all active:scale-95`}
	{disabled}
	on:click={onClick}
>
	<slot />
</button>
