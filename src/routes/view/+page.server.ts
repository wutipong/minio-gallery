import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const path = url.searchParams.get('path');

    return {path: path}
}