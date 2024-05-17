<script lang="ts">
	import * as maptilersdk from '@maptiler/sdk';
	import { onDestroy, onMount } from 'svelte';
	import type { ActionData } from './$types';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	let mainMap: maptilersdk.Map | undefined = undefined;
	let mapSideSheet: HTMLButtonElement | undefined = undefined;
	let mapOnSideSheet: maptilersdk.Map | undefined = undefined;
	let mapOnSideSheetContainer: any = undefined;
	export let form: ActionData;
	const API_KEY = '17pE2Nv1XmrNauiHohBm';

	onMount(() => {
		const initialState = { lng: 121.02904, lat: 14.69766, zoom: 16 };
		mapSideSheet = <HTMLButtonElement>document.getElementById('showMapDataTrigger');
		mainMap = new maptilersdk.Map({
			container: 'mainMapContainer',
			style: `https://api.maptiler.com/maps/81f6dc3d-e229-4e80-b504-d0b750984104/style.json?key=${API_KEY}`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
		const marker = new maptilersdk.Marker().setLngLat([121.02904, 14.69766]).addTo(mainMap);
	});

	onMount(() => {
		if (form?.userData !== undefined) {
			const sideSheetButton = <HTMLButtonElement>document.getElementById('showMapDataTrigger');
			sideSheetButton.click();
			const initialState = { lng: 121.02904, lat: 14.69766, zoom: 18 };
			setTimeout(() => {
				mapOnSideSheet = new maptilersdk.Map({
					container: mapOnSideSheetContainer,
					style: `https://api.maptiler.com/maps/81f6dc3d-e229-4e80-b504-d0b750984104/style.json?key=${API_KEY}`,
					center: [initialState.lng, initialState.lat],
					zoom: initialState.zoom
				});
			}, 0);
		}
		// show the current searched user location in the map
	});

	onDestroy(() => {
		mainMap?.remove();
	});
</script>

<Sheet.Root>
	<Sheet.Trigger id="showMapDataTrigger"></Sheet.Trigger>
	<Sheet.Content class="overflow-y-scroll" side="right">
		<h4>Tomb Information:</h4>
		<Separator class="my-4" />
		<div bind:this={mapOnSideSheetContainer} class="h-1/2 w-full rounded-md"></div>
		<Separator class="my-4" />
		<h4>Name: {form?.userData?.name}</h4>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora repellat numquam debitis
			rerum voluptatibus maxime cum sequi alias ratione explicabo!
		</p>
	</Sheet.Content>
</Sheet.Root>
<div id="mainMapContainer" class="h-screen w-full rounded-md"></div>
