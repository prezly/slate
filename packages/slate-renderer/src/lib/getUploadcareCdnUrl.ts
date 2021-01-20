import { UploadcareFileStoragePayload } from '@prezly/slate-types';

const UPLOADCARE_CDN_URL = 'https://cdn.uc.assets.prezly.com';

interface Options {
    download?: boolean;
}

const getUploadcareCdnUrl = (
    file: UploadcareFileStoragePayload,
    { download }: Options = {},
): string => {
    const filename = encodeURIComponent(file.filename);

    if (download) {
        return `${UPLOADCARE_CDN_URL}/${file.uuid}/-/inline/no/${filename}`;
    }

    return `${UPLOADCARE_CDN_URL}/${file.uuid}/${filename}`;
};

export default getUploadcareCdnUrl;
