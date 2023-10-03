<script lang="ts">
	import { prefs } from '$lib/commands/userdata';
	import Button from '$lib/components/input/Button.svelte';
	import DropdownInput from '$lib/components/input/DropdownInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import SliderInput from '$lib/components/input/SliderInput.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import { EASING_SETTINGS } from '$lib/utils/constants';
	import { getDateCountdown } from '$lib/utils/conversions';
	import {
		RiAddCircleLine,
		RiCheckboxCircleLine,
		RiClipboardLine,
		RiCloseLine,
		RiDeleteBinLine,
		RiInformationLine
	} from 'svelte-remixicon';
	import { cubicInOut } from 'svelte/easing';
	import { blur, fade, scale } from 'svelte/transition';

	let popoutActive: boolean = true;
	let advancedSettings: boolean = false;
	let newLinkData = {
		name: "",
		expire: 0,
		max: 1,
		file: 0
	}
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
			<div
				class="bg-jet rounded-lg shadow-lg w-popout p-4 relative"
				transition:scale={EASING_SETTINGS}
			>
				<div class="flex justify-between items-center px-2">
					<div>
						<h1 class="text-2xl w-full">New Link</h1>
						<p class="text-sm">Create and share upload links to allow others to send you files.</p>
					</div>
					<Button
						class="w-min group focus:border-bright-pink absolute right-4 top-4"
						onClick={() => (popoutActive = false)}
					>
						<RiCloseLine
							size="24"
							class="group-focus:fill-bright-pink group-hover:fill-bright-pink transition-all"
						/>
					</Button>
				</div>
				<div class="mt-4 space-y-2">
					<TextInput id="s" value={newLinkData.name} placeholder="Alice">Your Name <span class="text-xs">(<button class="text-aquamarine underline" on:click={() => newLinkData.name = 'Anonymous'}>Anonymous?</button>)</span></TextInput>
					{#if advancedSettings}
						<DropdownInput id="s" options={['s']}>Relay Server</DropdownInput>
					{/if}
					<DropdownInput id="s" options={['30 minutes', '1 hour', '6 hours', '12 hours', '1 day', '1 week']}>Expire After</DropdownInput>
					<NumberInput id="s" value={1}>Max Uses</NumberInput>
					<SliderInput id="s" max={6400} min={10}>Max File Size</SliderInput>
					<div class="flex justify-center items-center pb-6 w-full">
						<button
							class="text-sm underline text-center opacity-75 focus:text-aquamarine hover:text-aquamarine transition-all"
							on:click={() => advancedSettings = !advancedSettings}
						>
							{advancedSettings ? 'Hide' : 'Show'} Advanced Settings
						</button>
					</div>
					<Button class="justify-center text-center" onClick={() => (popoutActive = true)}>
						<RiCheckboxCircleLine size="24" class="mr-2 fill-aquamarine" />
						<p class="whitespace-nowrap text-aquamarine font-bold">Create Link</p>
					</Button>
				</div>
			</div>
		</div>
	{/if}
</div>
