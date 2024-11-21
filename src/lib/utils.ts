export function getFilenameFromKey(name: string, type: 'image' | 'zip' | 'directory') {
    if (type == 'zip' || type == 'directory') {
        name = name.substring(0, name.length - 1);
    }

    return name.substring(name.lastIndexOf('/') + 1);
}