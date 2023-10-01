<script>
	import { linkData } from '$lib/commands/userdata';
	import Button from '$lib/components/input/Button.svelte';
	import Logo from '$lib/components/nav/Logo.svelte';
	import NavItem from '$lib/components/nav/NavItem.svelte';
	import PowerButton from '$lib/components/nav/PowerButton.svelte';
	import { getDateCountdown } from '$lib/utils/conversions';
	import { RiAddCircleLine, RiClipboardLine, RiDeleteBinLine, RiInformationLine } from 'svelte-remixicon';
	import { get } from 'svelte/store';
</script>

<main class="flex">
	<div
		class="flex flex-col items-start py-4 w-48 border-r-2 border-white border-opacity-10 h-screen"
	>
		<Logo class="px-4 pb-2" />
		<NavItem item={0} active />
		<NavItem item={1} />
		<NavItem item={2} />
	</div>
	<div class="p-4 flex-grow h-full">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl w-full">Upload Links</h1>
			<Button class="w-min">
				<RiAddCircleLine size="24" class="mr-2" />
				<p class="whitespace-nowrap">New Link</p>
			</Button>
		</div>
		<table class="my-8 w-full">
			<thead>
				<tr>
					<th>url</th>
					<th>expires</th>
					<th>uses</th>
					<th class="text-right">actions</th>
				</tr>
			</thead>
			<tbody>
				{#each get(linkData) as link, i}
					<tr>
						<td class="py-2">
							<a href={link.data.url} class="text-aquamarine underline cursor-pointer">
								{link.data.url}
							</a>
						</td>
						<td class="py-2">{getDateCountdown(link.data.expires)}</td>
						<td class="py-2">0/{link.data.max_usage}</td>
						<td class="flex justify-end py-2 space-x-2">
							<RiClipboardLine size="24" class="text-aquamarine" />
							<button on:click={() => null}>
								<RiDeleteBinLine size="24" class="text-bright-pink" />
							</button>
							<RiInformationLine size="24" />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
