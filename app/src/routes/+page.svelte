<script lang="ts">
	import { prefs } from '$lib/commands/userdata';
	import Button from '$lib/components/input/Button.svelte';
	import { EASING_SETTINGS } from '$lib/utils/constants';
	import { getDateCountdown } from '$lib/utils/conversions';
	import {
		RiAddCircleLine,
		RiClipboardLine,
		RiCloseLine,
		RiDeleteBinLine,
		RiInformationLine
	} from 'svelte-remixicon';
	import { cubicInOut } from 'svelte/easing';
	import { blur, fade, scale } from 'svelte/transition';

	let popoutActive: boolean = true;
</script>

<div class="flex-grow h-full relative overflow-hidden">
	<div class="p-4 h-full w-full">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl w-full">Upload Links</h1>
			<Button class="w-min" onClick={() => (popoutActive = true)}>
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
				{#each $prefs.links as link}
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
	{#if popoutActive}
		<div
			class="p-12 h-full w-full fixed z-20 top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
			transition:fade={EASING_SETTINGS}
		>
			<div class="bg-jet rounded-lg shadow-lg w-full h-full p-4" transition:scale={EASING_SETTINGS}>
				<div class="flex justify-between items-center">
					<h1 class="text-2xl w-full">New Link</h1>
					<Button
						class="w-min group focus:border-bright-pink"
						onClick={() => (popoutActive = false)}
					>
						<RiCloseLine
							size="24"
							class="group-focus:fill-bright-pink group-hover:fill-bright-pink transition-all"
						/>
					</Button>
				</div>
			</div>
		</div>
	{/if}
</div>
