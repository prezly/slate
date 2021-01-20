import { UploadcareFileStoragePayload } from '@prezly/slate-types';

const UPLOADCARE_CDN_URL = 'https://cdn.uc.assets.prezly.com';

const getUploadcareCdnUrl = (file: UploadcareFileStoragePayload): string => {
    return `${UPLOADCARE_CDN_URL}/${file.uuid}/${encodeURIComponent(file.filename)}`;
};

export default getUploadcareCdnUrl;
