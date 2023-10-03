<script>
	import '../app.css';
	import Logo from '$lib/components/nav/Logo.svelte';
	import NavItem from '$lib/components/nav/NavItem.svelte';
	import { page } from '$app/stores';  
	import { goto } from '$app/navigation';
</script>

<main class="flex">
	<div
		class="flex flex-col items-start py-4 w-48 h-screen bg-eerie-black"
	>
		<Logo class="px-4 pb-2" />
		<NavItem item={0} path="/" />
		<NavItem item={1} path="/files" />
		<NavItem item={2} path="/settings" />
	</div>
	<slot />
</main>
