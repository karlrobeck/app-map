import PathFinder from 'geojson-path-finder';
import type { GeoJson, GeoJsonCoordinates, GeoJsonFeature } from './db/types';
import { calculateDistance } from './utils';
import * as maptilersdk from '@maptiler/sdk';
import { v4 as uuidv4 } from 'uuid';

export const MAP_URL =
	'https://api.maptiler.com/data/649d5018-07ca-4356-bea4-0a0e9e396428/features.json?key={}';

export function findNearestNode(
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

export function addMarkerToMap(mainMap: maptilersdk.Map, longtitude: number, latitude: number) {
	new maptilersdk.Marker().setLngLat([longtitude, latitude]).addTo(mainMap);
}

export function showDirections(
	mainMap: maptilersdk.Map,
	roadData: GeoJson,
	currentDirection: string,
	userLocation: GeoJsonCoordinates,
	destinationNode: GeoJsonCoordinates
) {
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
		// remove the previous direction
		if (currentDirection) {
			mainMap = mainMap.removeLayer(currentDirection);
		}
		let newDirection = `route-${uuidv4()}`;
		mainMap.addLayer({
			id: newDirection,
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
		return newDirection;
	}
}
