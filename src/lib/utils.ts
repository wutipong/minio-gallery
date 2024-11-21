import stringHash from "string-hash";

export function getFilenameFromKey(name: string, type: 'image' | 'media' | 'zip' | 'directory') {
    if (type == 'zip' || type == 'directory') {
        name = name.substring(0, name.length - 1);
    }

    return name.substring(name.lastIndexOf('/') + 1);
}

export function createElementId(name: string): string {
    return stringHash(name).toString(16);
}

export function determinFileType(name: string): string | undefined {
    const lower = name.toLowerCase();

    if (lower.endsWith(".zip")) {
        return "zip"
    }
    else if (lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".png") ||
        lower.endsWith(".webp") ||
        lower.endsWith(".gif")) {
        return "image"

    } else if (
        lower.endsWith(".aac") ||
        lower.endsWith(".m2a") ||
        lower.endsWith(".m3a") ||
        lower.endsWith(".m4a") ||
        lower.endsWith(".m4b") ||
        lower.endsWith(".m4v") ||
        lower.endsWith(".mov") ||
        lower.endsWith(".mp2") ||
        lower.endsWith(".mp2a") ||
        lower.endsWith(".mp3") ||
        lower.endsWith(".mp4") ||
        lower.endsWith(".mp4a") ||
        lower.endsWith(".mpga") ||
        lower.endsWith(".oga") ||
        lower.endsWith(".ogg") ||
        lower.endsWith(".ogv") ||
        lower.endsWith(".spx") ||
        lower.endsWith(".wav") ||
        lower.endsWith(".weba") ||
        lower.endsWith(".webm")) {
        return "media"
    }
}

