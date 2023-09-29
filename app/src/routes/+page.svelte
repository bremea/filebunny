<script>
	import Logo from '$lib/components/nav/Logo.svelte';
	import NavItem from '$lib/components/nav/NavItem.svelte';
	import PowerButton from '$lib/components/nav/PowerButton.svelte';
</script>

<main class="flex">
	<div class="flex flex-col items-start py-4 w-48 border-r-2 border-white border-opacity-10 h-screen">
		<Logo class="px-4 pb-2" />
		<NavItem item={0} active />
		<NavItem item={1} />
		<NavItem item={2} />
	</div>
</main>
