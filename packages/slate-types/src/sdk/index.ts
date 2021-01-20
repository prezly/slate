/**
 * In the future, this directory should be removed, and all types that live in it should
 * be imported from "@prezly/sdk" or "@prezly/sdk-types".
 *
 * Or perhaps this whole "slate-types" package should be merged into one of the aforementioned
 * packages?
 */

export { default as OEmbedInfo, isOEmbedInfo } from './OEmbedInfo';
export { default as OEmbedInfoType } from './OEmbedInfoType';
export { default as PressContact, isPressContact } from './PressContact';
export { default as UploadcareFile } from './UploadcareFile';
export { default as UploadcareFileStoragePayload } from './UploadcareFileStoragePayload';
export { default as UploadcareImage } from './UploadcareImage';
export { default as UploadcareImageStoragePayload } from './UploadcareImageStoragePayload';
export {
    default as UploadcareStoragePayload,
    isPrezlyStoragePayload,
} from './UploadcareStoragePayload';
