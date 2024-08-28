import { fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import type { GeoJson } from '$lib/db/types';
import { readRecord, retrieveByCategory, searchPerson } from '$lib/db';

const API_KEY = '17pE2Nv1XmrNauiHohBm';

export const load: PageServerLoad = async (event) => {
    const coordsJson: GeoJson = await (
        await event.fetch(
            `https://api.maptiler.com/data/956b4525-6396-4870-9296-1788b636beef/features.json?key=${API_KEY}`,
        )
    ).json();
    if (!coordsJson) {
        return;
    }
    let records = await readRecord(event.fetch);

    // TODO check if we have a query that has a coordinates
    let filtered_records = searchPerson(records, 'alvarez')
    console.log(filtered_records.map((value) => value.firstName));

    return {
        coordsJson: coordsJson,
        API_KEY: API_KEY
    }
}
