<script lang="ts">
	import * as maptilersdk from '@maptiler/sdk';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import * as Sheet from '$lib/components/ui/sheet';
	import Button from '$lib/components/ui/button/button.svelte';
	let mainMap: maptilersdk.Map | undefined = undefined;
	export let data: PageData;
	let clusterData: any = {};
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
		let marker: maptilersdk.Marker | undefined = undefined;
		mainMap.on('load', () => {
			mainMap.on('click', (ev) => {
				const { lng, lat } = ev.lngLat;

				const buildingFeatures = mainMap?.queryRenderedFeatures(ev.point, {
					layers: ['bbuilding'] // put in layer id
				});

				const parkingfeature = mainMap?.queryRenderedFeatures(ev.point, {
					layers: ['Parking Cover'] // put in parking layer id
				});

				if (buildingFeatures?.length || parkingfeature?.length) {
					buildingFeatures?.forEach((feature) => {
						const nameProperty = feature.properties?.name;
						const addressProperty = feature.properties?.['addr:housenumber'];
						if (nameProperty && addressProperty) {
							const sheetBtn = <HTMLButtonElement>document.getElementById('clusterSheetBtn');
							clusterData['nameProperty'] = nameProperty;
							clusterData['addressProperty'] = addressProperty;
							sheetBtn.click();
						}
					});
					parkingfeature?.forEach((feature) => {
						console.log('Parking feature properties:', feature.properties.name);
						new maptilersdk.Popup({ offset: 25 })
							.setLngLat(ev.lngLat)
							.setHTML(
								' <h3> Bagbag Cemetery Parking</h3 > <p>Operator: bagbag cemetery</p> <p>Address: Bagbag Cemetery,Pagkabuhay road, Novaliches, Quezon City, Metro Manila </p>'
							)
							.addTo(mainMap);
					});
					marker?.remove();
					marker = new maptilersdk.Marker().setLngLat(ev.lngLat).addTo(mainMap);
				}
			});
		});
	});

	onDestroy(() => {
		mainMap?.remove();
	});
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button id="clusterSheetBtn" builders={[builder]} class="hidden"
			>Click to show cluster sheet</Button
		>
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>
				{clusterData?.nameProperty}
			</Sheet.Title>
			<Sheet.Description>
				{clusterData?.addressProperty}
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
<div id="mainMapContainer" class="h-screen w-full rounded-md"></div>
