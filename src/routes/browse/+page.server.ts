import { listObjects } from "$lib/minio";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    const path = url.searchParams.get('path');

    return await listObjects(path? path:"");
}