import { env } from "$env/dynamic/private";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

interface ListObject {
    type: 'image' | 'zip' | 'directory'
    name: string
}

interface ListOutput {
    path: string
    objects: ListObject[]
}

export async function listObjects(path: string): Promise<ListOutput> {
    const client = new S3Client({
        region: env.MINIO_REGION,
        endpoint: env.MINIO_ENDPOINT,
        bucketEndpoint: false,
        forcePathStyle: true,
        credentials: {
            accessKeyId: env.MINIO_ACCESSKEY_ID,
            secretAccessKey: env.MINIO_SECRET_KEY,
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
        Bucket: env.MINIO_BUCKET,
        Prefix: path ? path : "",
        Delimiter: '/',
    });

    let objects: ListObject[] = []

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

    return {
        objects: objects ? objects : [],
        path: data.Prefix ? data.Prefix : "",
    }
}

export function publicObjectUrl(name: string): URL{
    return new URL(`${env.MINIO_BUCKET}/${name}`, env.MINIO_ENDPOINT);
}