declare module 'uploadcare-widget' {
    interface JQueryPromise<T> extends Promise<T> {
        done<V = T>(
            callback: (value: T) => V | PromiseLike<V> | JQueryPromise<V>,
        ): JQueryPromise<T>;
        fail<E = Error, V = void>(
            callback: (reason: E) => V | PromiseLike<V> | JQueryPromise<V>,
        ): JQueryPromise<T>;
        always<V = void>(
            callback: (value: T) => V | PromiseLike<V> | JQueryPromise<V>,
        ): JQueryPromise<T>;
    }

    interface JQueryCallbacks<T> {
        add(callback: (value: T) => void): JQueryCallbacks<T>;
        remove(callback: (value: T) => void): JQueryCallbacks<T>;
    }

    /**
     * @see https://uploadcare.com/docs/api_reference/javascript/files_uploads/#file-info
     */
    export interface FileInfo {
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

    /**
     * @see https://uploadcare.com/docs/file_uploader_api/files_uploads/#upload-info
     */
    export interface UploadInfo {
        /**
         * File ready state combines the progress of both upload and preparing info,
         * as a value ranging from 0 to 1.
         */
        progress: number;
        state: 'uploading' | 'uploaded' | 'ready';
        /**
         * Upload progress as a value ranging from 0 to 1.
         */
        uploadProgress: number;
    }

    export interface FilePromise extends JQueryPromise<FileInfo> {
        progress: (callback: (uploadInfo: UploadInfo) => void) => void;
    }

    export interface CollectionOfPromises {
        onAdd: JQueryCallbacks<FilePromise>;
        onRemove: JQueryCallbacks<FilePromise>;
        onSort: JQueryCallbacks<FilePromise>;
        onReplace: JQueryCallbacks<FilePromise>;
        sort(comparator: (a: FilePromise, b: FilePromise) => number): CollectionOfPromises;
        get(): FilePromise[];
        get(index: number): FilePromise;
        add: (item: FilePromise) => void;
        onAnyProgress: (file: FilePromise, progress: number) => void;
        onAnyFail: (file: FilePromise) => void;
        onAnyDone: (file: FilePromise) => void;
    }

    export interface DialogOptions {
        publicKey?: string;
        multiple?: boolean;
        multipleMax?: number;
        multipleMin?: number;
        imagesOnly?: boolean;
        previewStep?: boolean;
        crop?: 'disabled' | 'free' | string;
        imageShrink?: string;
        tabs?: string;
        inputAcceptTypes?: string;
        preferredTypes?: string;
        multipartMinSize?: number;
        secureSignature?: string;
        secureExpire?: number;
        previewProxy?: string;
        previewUrlCallback?: (originalUrl: string, fileInfo: FileInfo) => string;
        cdnBase?: string;
        doNotStore?: boolean;
        validators?: ((fileInfo: FileInfo) => void)[];
        audioBitsPerSecond?: number;
        videoBitsPerSecond?: number;
    }

    export interface Dialog<T> extends JQueryPromise<T> {
        fileColl: CollectionOfPromises;
        addFiles(files: FilePromise[]): void;
        switchTab(tab: string): void;
        hideTab(tab: string): void;
        showTab(tab: string): void;
        isTabVisible(tab: string): boolean;
        onTabVisibility(tab: string, callback: (tab: string, visibility: boolean) => void): boolean;
    }

    export interface Uploadcare {
        fileFrom(source: 'uploaded', cdnUrl: string): FilePromise;
        fileFrom(source: 'uploaded', uuid: string): FilePromise;
        fileFrom(source: 'url', fileUrl: string): FilePromise;
        fileFrom(source: 'object', nativeFile: File): FilePromise;
        fileFrom(source: 'input', inputIdentifier: string): FilePromise;

        openDialog<T = FilePromise | FilePromise[]>(
            files: FilePromise | FilePromise[],
            tab?: string,
            options?: DialogOptions,
        ): Dialog<T>;
    }

    const uploadcare: Uploadcare;

    export default uploadcare;
}
