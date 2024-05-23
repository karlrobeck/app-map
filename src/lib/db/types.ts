export interface DeadPerson {
    dateOfBurial: string
    cemetery: string
    firstName: string
    middleName: string | undefined
    lastName: string
    birthDay: string
}

export interface GeoJsonGeometry {
    type: string
    coordinates: number[][][]
}

export interface GeoJsonProperties {
    name: string
    layer: string
    soprt: string
    height: string
    office: string
    osm_id: number
    amenity: string
    leisure: string
    building: string
    "addr:city": string
    "name:abbr": string
    "addr:street": string
    "addr:quarter": string
    events_venue: string
    "building:levels": number
    "addr:housenumber": string
}

export interface GeoJson {
    type: string
    features: GeoJsonFeature[]
}

export interface GeoJsonFeature {
    type: string
    geometry: GeoJsonGeometry
    id: string
    properties: GeoJsonProperties
}

export interface GeoJsonCoordinates {
    long: number
    lat: number
}