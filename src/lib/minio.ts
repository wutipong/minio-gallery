import { env } from "$env/dynamic/private";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { determinFileType } from "./utils";
import naturalCompare from 'natural-compare-lite';


interface ListObject {
    type: 'image' | 'media' | 'zip' | 'directory'
    name: string
}

interface ListOutput {
    path: string
    objects: ListObject[]
    prefixes: ListObject[]
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
    let prefixes: ListObject[] = []

    const data = await client.send(command);

    if (data.CommonPrefixes) {
        for (const prefix of data.CommonPrefixes) {
            if (prefix.Prefix) {
                prefixes.push({
                    type: "directory",
                    name: prefix.Prefix,
                })
            }
        }
    }

    if (data.Contents) {
        for (const content of data.Contents) {
            if (!content.Key) continue;

            const filetype = determinFileType(content.Key)

            if (!filetype) continue;

            switch (filetype) {
                case "zip":
                    prefixes.push({
                        type: "zip",
                        name: content.Key + "/",
                    })
                    break;

                case "image":
                    objects.push({
                        type: "image",
                        name: content.Key,
                    })
                    break;

                case "media":
                    objects.push({
                        type: "media",
                        name: content.Key,
                    })
                    break;
            }
        }
    }

    prefixes.sort((a,b) => naturalCompare(a.name, b.name))
    objects.sort((a,b) => naturalCompare(a.name, b.name))

    return {
        prefixes: prefixes,
        objects: objects ? objects : [],
        path: data.Prefix ? data.Prefix : "",
    }
}

export function publicObjectUrl(name: string): URL {
    return new URL(`${env.MINIO_BUCKET}/${name}`, env.MINIO_ENDPOINT);
}