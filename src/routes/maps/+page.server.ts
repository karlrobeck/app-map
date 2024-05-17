import { fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async (event) => {

}

export const actions: Actions = {
    search: async (event) => {
        const form = await event.request.formData()
        const searchBox = form.get("searchBox")?.toString();
        if (!searchBox) {
            return fail(400, { message: "Invalid request" })
        }
        // fetch data from database
        // return and display data for the ui
        return {
            userData: {
                name: searchBox
            }
        }
    }
}