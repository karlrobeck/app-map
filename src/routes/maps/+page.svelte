<script lang="ts">
	import * as maptilersdk from '@maptiler/sdk';
	import { onDestroy, onMount } from 'svelte';

	let map: maptilersdk.Map | undefined = undefined;

	const API_KEY = '17pE2Nv1XmrNauiHohBm';

	onMount(() => {
		const initialState = { lng: 121.02904, lat: 14.69766, zoom: 16 };
		map = new maptilersdk.Map({
			container: 'map',
			style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<div id="map" class="h-screen rounded-md">Hello</div>
