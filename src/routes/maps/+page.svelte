<script lang="ts">
	import * as maptilersdk from '@maptiler/sdk';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import { point, inside, polygon } from '@turf/turf';
	let mainMap: maptilersdk.Map | undefined = undefined;
	let mapSideSheet: HTMLButtonElement | undefined = undefined;
	let mapOnSideSheet: maptilersdk.Map | undefined = undefined;
	let mapOnSideSheetContainer: any = undefined;
	export let data: PageData;
	const API_KEY = '17pE2Nv1XmrNauiHohBm';
	onMount(async () => {
		// get the json of
		const initialState = { lng: 121.02904, lat: 14.69766, zoom: 17.5 };
		maptilersdk.config.apiKey = data.API_KEY || '';
		mainMap = new maptilersdk.Map({
			container: 'mainMapContainer', // container's id or the HTML element to render the map
			style: '81f6dc3d-e229-4e80-b504-d0b750984104',
			center: [initialState.lng, initialState.lat], // starting position [lng, lat]
			zoom: initialState.zoom // starting zoom
		});
		let marker = new maptilersdk.Marker().setLngLat([121.02904, 14.69766]).addTo(mainMap);
		mainMap.on('click', (ev) => {
			const { lng, lat } = ev.lngLat;
			if (!data.coordsJson) {
				throw new Error('Unable to load cluster coordinates');
			}
			data.coordsJson.features.forEach((value, index) => {
				const clickedPoint = point([lng, lat]);
				const poly = polygon(value.geometry.coordinates);
				if (inside(clickedPoint, poly)) {
					marker.remove();
					marker = new maptilersdk.Marker().setLngLat([lng, lat]).addTo(mainMap);
					console.log(value.properties.name);
				}
			});
		});
	});

	onDestroy(() => {
		mainMap?.remove();
	});
</script>

<div id="mainMapContainer" class="h-screen w-full rounded-md"></div>
