<script lang="ts">
	import * as maptilersdk from '@maptiler/sdk';
	import { onDestroy, onMount } from 'svelte';

	let map: maptilersdk.Map | undefined = undefined;

	const API_KEY = '17pE2Nv1XmrNauiHohBm';

	onMount(() => {
		const initialState = { lng: 121.02904, lat: 14.69766, zoom: 16 };
		maptilersdk.config.apiKey = API_KEY;
		map = new maptilersdk.Map({
			container: 'map',
			style: `81f6dc3d-e229-4e80-b504-d0b750984104`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<div id="map" class="h-screen rounded-md">Hello</div>
