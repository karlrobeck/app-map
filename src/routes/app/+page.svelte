<script lang="ts">
	import type { GeoJson, GeoJsonCoordinates, GeoJsonFeature } from '$lib/db/types';
	import * as maptilersdk from '@maptiler/sdk';
	import * as Card from '$lib/components/ui/card';
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import * as Sheet from '$lib/components/ui/sheet';
	import Button from '$lib/components/ui/button/button.svelte';
	import { calculateDistance } from '$lib/utils';
	import PathFinder from 'geojson-path-finder';
	import { v4 as uuidv4 } from 'uuid';
	import { retrieveByCluster, type RecordDB } from '$lib/db';
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
		const response = await fetch(
			`https://api.maptiler.com/data/649d5018-07ca-4356-bea4-0a0e9e396428/features.json?key=${data.API_KEY}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		roadData = await response.json();
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

		new maptilersdk.Marker().setLngLat([nearestNode?.long, nearestNode?.lat]).addTo(mainMap);
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
						const nameProperty = feature.properties?.name;
						const addressProperty = feature.properties?.['addr:housenumber'];
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

	function findNearestNode(
		coordinates: GeoJsonFeature[],
		node: GeoJsonCoordinates
	): {
		distance: number | null;
		coord: GeoJsonCoordinates | null;
	} {
		var bestDistance: number | null = null;
		var bestCoord: GeoJsonCoordinates | null = null;

		coordinates.forEach((feature) => {
			feature.geometry.coordinates.forEach((coords) => {
				let currentCoord: GeoJsonCoordinates = {
					long: <number>(<unknown>coords[0]),
					lat: <number>(<unknown>coords[1])
				};
				let distance = calculateDistance(node, currentCoord);
				if (bestDistance == null || distance < bestDistance) {
					bestDistance = distance;
					bestCoord = currentCoord;
				}
			});
		});

		return { distance: bestDistance, coord: bestCoord };
	}

	function showDirections() {
		const pathFinder = new PathFinder(roadData);
		const startPos = findNearestNode(roadData.features, userLocation);
		const endingPos = findNearestNode(roadData.features, destinationNode);
		const path = pathFinder.findPath(
			{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [startPos.coord?.long, startPos.coord?.lat]
				},
				properties: {
					name: 'Starting Position'
				}
			},
			{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [endingPos.coord?.long, endingPos.coord?.lat]
				},
				properties: {
					name: 'Ending Position'
				}
			}
		);
		if (path) {
			if (currentDirection) {
				mainMap = mainMap.removeLayer(currentDirection);
			}
			currentDirection = `route-${uuidv4()}`;
			mainMap.addLayer({
				id: currentDirection,
				type: 'line',
				source: {
					type: 'geojson',
					//@ts-ignore
					data: {
						type: 'Feature',
						geometry: {
							type: 'LineString',
							coordinates: path?.path.map((coords) => [coords[0], coords[1]])
						}
					}
				},
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': '#888',
					'line-width': 6
				}
			});
		}
	}

	onDestroy(() => {
		mainMap?.remove();
	});
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button id="clusterSheetBtn" builders={[builder]} class="hidden">
			Click to show cluster sheet
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="bottom" class="h-3/4 overflow-y-auto">
		<Sheet.Header>
			<Sheet.Title>
				{clusterData?.nameProperty}
			</Sheet.Title>
			<Sheet.Description>
				{clusterData?.addressProperty}
				<Button on:click={showDirections}>Show Direction</Button>
			</Sheet.Description>
		</Sheet.Header>
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
	</Sheet.Content>
</Sheet.Root>
<div id="mainMapContainer" class="absolute h-screen w-full rounded-md"></div>
