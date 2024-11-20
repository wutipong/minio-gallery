import {
    MINIO_ENDPOINT,
    MINIO_REGION,
    MINIO_BUCKET,
    MINIO_ACCESSKEY_ID
} from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    return {
        endpoint: MINIO_ENDPOINT,
        region: MINIO_REGION,
        bucket: MINIO_BUCKET,
        accessKeyID: MINIO_ACCESSKEY_ID,
        secretKey: "******************",
    }
}