/**
 * @see https://uploadcare.com/docs/api_reference/javascript/files_uploads/#file-info
 */
export default interface UploadcareFileInfo {
    uuid: string;
    name: string;
    size: number;
    mimeType: string;
    isStored: boolean;
    isImage: boolean;
    cdnUrl: string;
    cdnUrlModifiers: string | null;
    originalUrl: string;
    originalImageInfo: null | {
        width: number;
        height: number;
        format: string;
        dpi: number | null;
    };
}
