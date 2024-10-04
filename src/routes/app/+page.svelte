<script lang="ts">
	import type { GeoJson, GeoJsonCoordinates, GeoJsonFeature } from '$lib/db/types';
	import * as maptilersdk from '@maptiler/sdk';
	import * as Card from '$lib/components/ui/card';
	import * as Drawer from '$lib/components/ui/drawer';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import * as Sheet from '$lib/components/ui/sheet';
	import Button from '$lib/components/ui/button/button.svelte';
	import { calculateDistance } from '$lib/utils';
	import { retrieveByCluster, type RecordDB } from '$lib/db';
	import { addMarkerToMap, findNearestNode, MAP_URL, showDirections } from '$lib/map';
	let mainMap: maptilersdk.Map;
	export let data: PageData;
	let clusterData: any = {};
	let roadData: GeoJson;
	let nearestNode: GeoJsonCoordinates;
	let coordsArray: GeoJsonCoordinates[] = [];
	let destinationNode: GeoJsonCoordinates;
	let userLocation: GeoJsonCoordinates;
	let currentDirection: string = '';

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
		const response = await fetch(MAP_URL.replace('{}', data.API_KEY || ''));
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		roadData = <GeoJson>await response.json();
		roadData.features.forEach((value) => {
			value.geometry.coordinates.map((coord) => {
				//@ts-ignore
				const coords: [number, number] = coord;
				coordsArray.push({ long: coords[0], lat: coords[1] });
			});
		});
		userLocation = { long: 121.0298, lat: 14.6966 };

		// Find the nearest node
		let minDistance = Infinity;
		coordsArray.forEach((coord) => {
			const distance = calculateDistance(userLocation, coord);
			if (distance < minDistance) {
				minDistance = distance;
				nearestNode = coord;
			}
		});
		// set new marker
		if (nearestNode?.long && nearestNode?.lat) {
			addMarkerToMap(mainMap, nearestNode.long, nearestNode.lat);
		}
		let marker: maptilersdk.Marker | undefined = undefined;
		mainMap.on('load', () => {
			mainMap?.on('click', (ev) => {
				const buildingFeatures = mainMap.queryRenderedFeatures(ev.point, {
					layers: ['bbuilding']
				});

				const parkingfeature = mainMap.queryRenderedFeatures(ev.point, {
					layers: ['Parking Cover']
				});

				if (buildingFeatures?.length || parkingfeature?.length) {
					buildingFeatures?.forEach((feature) => {
						if (!feature.properties) {
							return;
						}
						const nameProperty = feature.properties.name;
						const addressProperty = feature.properties['addr:housenumber'];
						if (nameProperty && addressProperty) {
							const sheetBtn = <HTMLButtonElement>document.getElementById('clusterSheetBtn');
							clusterData['nameProperty'] = nameProperty;
							clusterData['addressProperty'] = addressProperty;
							//@ts-ignore
							clusterData['records'] = retrieveByCluster(data.records, clusterData['nameProperty']);
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
					destinationNode = { long: ev.lngLat.lng, lat: ev.lngLat.lat };
					marker = new maptilersdk.Marker().setLngLat(ev.lngLat).addTo(mainMap);
				}
			});
		});
	});
	onDestroy(() => {
		mainMap?.remove();
	});
</script>

<Drawer.Root>
	<Drawer.Trigger asChild let:builder>
		<Button id="clusterSheetBtn" builders={[builder]} class="hidden">
			Click to show cluster sheet
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="h-3/4">
		<div class="h-full mx-auto w-full max-w-sm overflow-y-auto">
			<Drawer.Header>
				<Sheet.Description>
					{clusterData?.addressProperty}
				</Sheet.Description>
				<Sheet.Title>
					{clusterData?.nameProperty}
				</Sheet.Title>
				<Button
					on:click={() => {
						let result = showDirections(
							mainMap,
							roadData,
							currentDirection,
							userLocation,
							destinationNode
						);
						if (result) {
							currentDirection = result;
						}
					}}>Show Direction</Button
				>
			</Drawer.Header>
			<div class="flex flex-col gap-5 pt-5">
				{#each clusterData?.records || [] as value}
					<Card.Root>
						<Card.Header>
							<Card.Title>
								{value.firstName}
								{value.middleName}
								{value.lastName}
							</Card.Title>
						</Card.Header>
					</Card.Root>
				{/each}
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
<div id="mainMapContainer" class="absolute h-screen w-full rounded-md"></div>
