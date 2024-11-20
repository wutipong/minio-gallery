import { MINIO_ACCESSKEY_ID, MINIO_BUCKET, MINIO_ENDPOINT, MINIO_REGION, MINIO_REGION, MINIO_SECRET_KEY } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

interface Object {
    type: 'image' | 'zip' | 'directory'
    name: string
}

interface PageData {
    objects: Object[]
}

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    const path = url.searchParams.get('path');

    const client = new S3Client({
        region: MINIO_REGION,
        endpoint: MINIO_ENDPOINT,
        bucketEndpoint: false,
        forcePathStyle: true,
        credentials: {
            accessKeyId: MINIO_ACCESSKEY_ID,
            secretAccessKey: MINIO_SECRET_KEY,
        },
    });

    client.middlewareStack.add(
        (next, context) => (args) => {
            args.request.headers["x-minio-extract"] = "true";
            return next(args);
        },
        {
            step: "build",
        }
    );

    const command = new ListObjectsV2Command({
        Bucket: MINIO_BUCKET,
        Prefix: path? path: "",
        Delimiter: '/',
    });

    let objects: Object[] = []

    // async/await.
    try {
        const data = await client.send(command);

        if (data.CommonPrefixes) {
            for (const prefix of data.CommonPrefixes) {
                if (prefix.Prefix) {
                    objects.push({
                        type: "directory",
                        name: prefix.Prefix,
                    })
                }
            }
        }

        if (data.Contents) {
            for (const content of data.Contents) {
                if (!content.Key) continue;
                const lower = content.Key.toLowerCase();

                if (lower.endsWith(".zip")) {
                    objects.push({
                        type: "zip",
                        name: content.Key + "/",
                    })
                }
                else if (lower.endsWith(".jpg") ||
                    lower.endsWith(".jpeg") || 
                    lower.endsWith(".png") || 
                    lower.endsWith(".webp") || 
                    lower.endsWith(".gif")) {
                    objects.push({
                        type: "image",
                        name: content.Key,
                    })
                }
            }
        }

        const output: PageData = {
            objects: objects,
        }

        return output
        // console.log(data)
        // process data.
    } catch (error) {
        console.log(error)
    } finally {
        // finally.
    }
}