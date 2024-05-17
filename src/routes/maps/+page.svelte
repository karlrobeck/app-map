<script lang="ts">
	import * as maptilersdk from '@maptiler/sdk';
	import { onDestroy, onMount } from 'svelte';
	import type { ActionData } from './$types';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	let map: maptilersdk.Map | undefined = undefined;
	let mapSideSheet: HTMLButtonElement | undefined = undefined;
	export let form: ActionData;
	const API_KEY = '17pE2Nv1XmrNauiHohBm';

	onMount(() => {
		const initialState = { lng: 121.02904, lat: 14.69766, zoom: 16 };
		maptilersdk.config.apiKey = API_KEY;
		mapSideSheet = <HTMLButtonElement>document.getElementById('showMapDataTrigger');
		map = new maptilersdk.Map({
			container: 'map',
			style: `81f6dc3d-e229-4e80-b504-d0b750984104`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
	});

	$: {
		if (form?.userData !== undefined) {
			mapSideSheet?.click();
		}
	}

	onDestroy(() => {
		map?.remove();
	});
</script>

<Sheet.Root>
	<Sheet.Trigger id="showMapDataTrigger"></Sheet.Trigger>
	<Sheet.Content side="right">
		<h4>Name: {form?.userData}</h4>
		<Separator class="my-4" />
	</Sheet.Content>
</Sheet.Root>
<div id="map" class="h-screen rounded-md">Loading map</div>
