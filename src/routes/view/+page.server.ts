import { listObjects } from "$lib/minio";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const path: string = url.searchParams.get('path');

    const prefix = path.substring(0, path.lastIndexOf('/') + 1)

    const resp = await listObjects(prefix)

    const index = resp.objects.findIndex((e) => e.name == path)

    return {
        current: path,
        previous: index > 0?resp.objects[index - 1].name: null,
        next: index < resp.objects.length -2? resp.objects[index + 1].name: null
    }
}