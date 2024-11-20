import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    return {
        endpoint: env.MINIO_ENDPOINT,
        region: env.MINIO_REGION,
        bucket: env.MINIO_BUCKET,
        accessKeyID: env.MINIO_ACCESSKEY_ID,
        secretKey: "******************",
    }
}