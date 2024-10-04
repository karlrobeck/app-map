<script lang="ts">
	import type { GeoJson, GeoJsonCoordinates, GeoJsonFeature } from '$lib/db/types';
	import * as maptilersdk from '@maptiler/sdk';
	import * as Card from '$lib/components/ui/card';
	import * as Drawer from '$lib/components/ui/drawer';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { calculateDistance } from '$lib/utils';
	import { retrieveByCluster, type RecordDB } from '$lib/db';
	import { addMarkerToMap, findNearestNode, MAP_URL, showDirections } from '$lib/map';
	import { Description } from 'formsnap';
	import { Title } from '$lib/components/ui/alert';
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
	<Drawer.Content class="mx-auto h-3/4 w-full">
		<div class="h-full w-full overflow-y-auto">
			<Drawer.Header>
				<Drawer.Description>
					{clusterData?.addressProperty}
				</Drawer.Description>
				<Drawer.Title>
					{clusterData?.nameProperty}
				</Drawer.Title>
				<Drawer.Close>
					<Button
						class="w-full"
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
						}}
					>
						Show Direction
					</Button>
				</Drawer.Close>
			</Drawer.Header>
			<div class="flex flex-col gap-5 pt-5">
				{#each clusterData?.records || [] as value}
					<Drawer.Root>
						<Drawer.Trigger>
							<Card.Root>
								<Card.Header>
									<Card.Title>
										{value.firstName}
										{value.middleName}
										{value.lastName}
									</Card.Title>
								</Card.Header>
							</Card.Root>
						</Drawer.Trigger>
						<Drawer.Content class="h-3/4 w-full">
							<div class="h-full w-full overflow-y-auto">
								<Drawer.Header>
									<div class="flex flex-row items-center gap-5">
										<Avatar.Root class="h-14 w-14 sm:h-16 sm:w-16">
											<Avatar.Fallback
												>{value.firstName.at(0)}{value.lastName.at(0)}</Avatar.Fallback
											>
										</Avatar.Root>
										<div class="flex flex-col items-start">
											<h3 class="scroll-m-0 text-sm sm:text-2xl tracking-normal">{value.lastName}, {value.firstName}, {value.middleName}</h3>
											<h4 class="scroll-m-0 text-sm sm:text-xl tracking-normal">{value.category} / {value.sex}</h4>
										</div>
									</div>
									<div class="flex flex-row items-center gap-5">
										<span class="small sm:large flex flex-row items-center gap-2.5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-cake2"
												viewBox="0 0 16 16"
											>
												<path
													d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683q-.224.051-.432.107c-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16s4.022-.227 5.432-.603c.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12 12 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22 22 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a29 29 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802zm-.668 5.556L3 5.524v.967q.468.111 1 .201V5.315a21 21 0 0 1 2-.242v1.855q.488.036 1 .054V5.018a28 28 0 0 1 2 0v1.964q.512-.018 1-.054V5.073c.72.054 1.393.137 2 .242v1.377q.532-.09 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356s-.012.139-.356.356c-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5s.012-.139.356-.356c.319-.2.814-.4 1.47-.575M15 7.806v1.027l-.68.907a.94.94 0 0 1-1.17.276 1.94 1.94 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9s4.022-.227 5.432-.603c.612-.163 1.149-.36 1.568-.591m0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.94.94 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426"
												/>
											</svg>
											{value.birthDay}</span
										>
										<span class="small sm:large flex flex-row items-center gap-2.5">
											<svg
												fill="#000000"
												height="16"
												width="16"
												version="1.1"
												id="Layer_1"
												xmlns="http://www.w3.org/2000/svg"
												xmlns:xlink="http://www.w3.org/1999/xlink"
												viewBox="0 0 512 512"
												xml:space="preserve"
											>
												<g>
													<g>
														<path
															d="M424.627,143.859L344.083,4.352C342.528,1.66,339.655,0,336.545,0H175.455c-3.11,0-5.983,1.66-7.538,4.352L87.373,143.859    c-1.096,1.899-1.436,4.14-0.951,6.278l80.544,355.084c0.899,3.965,4.423,6.779,8.489,6.779h161.088    c4.066,0,7.589-2.814,8.489-6.779l80.544-355.084C426.063,147.999,425.723,145.757,424.627,143.859z M329.593,494.591H182.406    l-78.252-344.98l76.327-132.202h151.038l76.328,132.202L329.593,494.591z"
														/>
													</g>
												</g>
												<g>
													<g>
														<path
															d="M375.332,151.323L317.28,50.776c-1.555-2.693-4.428-4.352-7.538-4.352H202.259c-3.11,0-5.983,1.66-7.538,4.352    l-58.051,100.547c-1.096,1.899-1.436,4.14-0.951,6.278l68.321,301.196c0.898,3.965,4.423,6.779,8.489,6.779h86.944    c4.066,0,7.59-2.814,8.489-6.779l68.321-301.196C376.768,155.463,376.428,153.222,375.332,151.323z M292.52,448.167h-73.041    l-66.029-291.092l53.834-93.242h97.432l53.833,93.242L292.52,448.167z"
														/>
													</g>
												</g>
												<g>
													<g>
														<path
															d="M320.604,142.089H279.27V98.526c0-4.807-3.897-8.704-8.704-8.704h-29.131c-4.807,0-8.704,3.897-8.704,8.704v43.563    h-41.335c-4.807,0-8.704,3.897-8.704,8.704v29.131c0,4.807,3.897,8.704,8.704,8.704h41.335v118.526    c0,4.807,3.897,8.704,8.704,8.704h29.131c4.807,0,8.704-3.897,8.704-8.704V188.629h41.335c4.807,0,8.704-3.897,8.704-8.704    v-29.131C329.309,145.987,325.411,142.089,320.604,142.089z M311.901,171.22h-41.335c-4.807,0-8.704,3.897-8.704,8.704v118.526    H250.14V179.925c0-4.807-3.897-8.704-8.704-8.704h-41.335v-11.722h41.335c4.807,0,8.704-3.897,8.704-8.704v-43.563h11.722v43.563    c0,4.807,3.897,8.704,8.704,8.704h41.335V171.22z"
														/>
													</g>
												</g>
											</svg>
											{value.dateOfDeath}
										</span>
									</div>
								</Drawer.Header>
								<div class="flex flex-col gap-5 p-4">
									<div class="grid grid-cols-3 border-b">
										<span class="muted">Cluster: <span class="small">{value.cluster}</span></span>
										<span class="muted">Wing: <span class="small">{value.wing}</span></span>
										<span class="muted">Level: <span class="small">{value.level}</span></span>
									</div>
									<div class="grid grid-cols-2">
										<span class="small sm:large">Date of interment</span>
										<span class="small sm:large underline">{value.dateOfInterment}</span>
									</div>
									<div class="grid grid-cols-2">
										<span class="small sm:large">Date of burial</span>
										<span class="small sm:large underline">{value.dateOfBurial}</span>
									</div>
									<div class="grid grid-cols-2">
										<span class="small sm:large">O.R Number</span>
										<span class="small sm:large underline">{value.ORNumber}</span>
									</div>
									<div class="grid grid-cols-2">
										<span class="small sm:large">Registration Number</span>
										<span class="small sm:large underline">{value.registrationNumber}</span>
									</div>
									<div class="grid grid-cols-2">
										<span class="small sm:large">Cemetery</span>
										<span class="small sm:large underline">{value.cemetery}</span>
									</div>
									<div class="grid grid-cols-2">
										<span class="small sm:large">Funeral Service</span>
										<span class="small sm:large underline">{value.funeralService}</span>
									</div>
									<div class="grid grid-cols-2">
										<span class="small sm:large">Cause of death</span>
										<span class="small sm:large underline">{value.causeOfDeath}</span>
									</div>
									<div class="grid grid-cols-2">
										<span class="small sm:large">Place of death</span>
										<span class="small sm:large underline">{value.placeOfDeath}</span>
									</div>
								</div>
							</div>
						</Drawer.Content>
					</Drawer.Root>
				{/each}
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
<div id="mainMapContainer" class="absolute h-screen w-full rounded-md"></div>
