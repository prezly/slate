import { UPLOADCARE_CDN_URL, UPLOADCARE_FILE_DATA_KEY } from '../constants';

import UploadcareFile from './UploadcareFile';
import UploadcareFileInfo from './UploadcareFileInfo';
import UploadcareGifVideo from './UploadcareGifVideo';
import UploadcareImageStoragePayload from './UploadcareImageStoragePayload';

type ImageFormat = 'auto' | 'jpeg' | 'png' | 'web';

const MAX_PREVIEW_SIZE = 2000;

class UploadcareImage {
    public static createFromUploadcareWidgetPayload = (
        fileInfo: UploadcareFileInfo,
    ): UploadcareImage => {
        if (!fileInfo.originalImageInfo) {
            throw new Error('UploadcareImage was given a non-image UploadcareFileInfo object');
        }

        return new UploadcareImage({
            effects: fileInfo.cdnUrlModifiers ? fileInfo.cdnUrlModifiers.split('-').slice(1) : [],
            filename: fileInfo.name,
            mimeType: fileInfo.mimeType,
            originalHeight: fileInfo.originalImageInfo.height,
            originalWidth: fileInfo.originalImageInfo.width,
            size: fileInfo.size,
            uuid: fileInfo.uuid,
        });
    };

    public static createFromPrezlyStoragePayload = (
        payload: UploadcareImageStoragePayload,
        caption?: string,
    ): UploadcareImage => {
        return new UploadcareImage({
            caption,
            effects: payload.effects || [],
            filename: payload.filename,
            mimeType: payload.mime_type,
            originalHeight: payload.original_height,
            originalWidth: payload.original_width,
            size: payload.size,
            uuid: payload.uuid,
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static isPrezlyStoragePayload = (
        payload: any,
    ): payload is UploadcareImageStoragePayload => {
        return (
            payload !== null &&
            typeof payload === 'object' &&
            typeof payload.original_width === 'number' &&
            typeof payload.original_height === 'number' &&
            Array.isArray(payload.effects) &&
            UploadcareFile.isPrezlyStoragePayload(payload)
        );
    };

    [UPLOADCARE_FILE_DATA_KEY]?: {
        caption: string;
    };

    effects: string[];

    filename: string;

    mimeType: string;

    originalHeight: number;

    originalWidth: number;

    size: number;

    uuid: string;

    constructor({
        caption,
        effects = [],
        filename,
        mimeType,
        originalHeight,
        originalWidth,
        size,
        uuid,
    }: {
        caption?: string;
        effects: string[];
        filename: string;
        mimeType: string;
        originalHeight: number;
        originalWidth: number;
        size: number;
        uuid: string;
    }) {
        if (typeof caption === 'string') {
            this[UPLOADCARE_FILE_DATA_KEY] = { caption };
        }

        this.effects = effects;
        this.filename = filename;
        this.mimeType = mimeType;
        this.originalHeight = originalHeight;
        this.originalWidth = originalWidth;
        this.size = size;
        this.uuid = uuid;
    }

    get aspectRatio(): number {
        const { height, width } = this.croppedSize;

        if (typeof width === 'undefined' || typeof height === 'undefined') {
            return 1;
        }

        return width / height;
    }

    get caption(): string | undefined {
        return this[UPLOADCARE_FILE_DATA_KEY]?.caption;
    }

    get cdnUrl(): string {
        return this.format().rawCdnUrl;
    }

    get croppedSize(): { height?: number; width?: number } {
        const cropEffect = this.effects.find((effect) => effect.startsWith('/crop/')) || '';
        const [, width, height] = cropEffect.match(/(\d+)x(\d+)/) || [];

        if (typeof width === 'undefined' || typeof height === 'undefined') {
            return {
                height: this.originalHeight,
                width: this.originalWidth,
            };
        }

        return {
            width: parseInt(width, 10),
            height: parseInt(height, 10),
        };
    }

    get downloadUrl(): string {
        return this.download().rawCdnUrl;
    }

    get rawCdnUrl(): string {
        const cdnUrl = [
            UPLOADCARE_CDN_URL,
            this.uuid,
            // Prepend a dash only if effects exist.
            // It doesn't matter if there's a dash at the end of URL even if there are no effects,
            // but it looks cleaner without it.
            this.effects.length === 0 ? this.effects : ['', ...this.effects].join('-'),
        ].join('/');

        return `${cdnUrl}${encodeURIComponent(this.filename)}`;
    }

    format = (imageFormat: ImageFormat = 'auto'): UploadcareImage => {
        return this.withEffect(`/format/${imageFormat}/`);
    };

    isGif = () => {
        return this.mimeType === 'image/gif';
    };

    getSrcSet(width: number = 1200) {
        if (this.originalWidth < width * 2) {
            return '';
        }

        const src1x = this.resize(width).cdnUrl;
        const src2x = this.resize(width * 2).cdnUrl;

        return `${src1x} 1x, ${src2x} 2x`;
    }

    download() {
        return this.withEffect('/inline/no/');
    }

    preview = (width: number | null = null, height: number | null = null): UploadcareImage => {
        if (this.isGif()) {
            // Do not resize GIF otherwise it breaks the animation
            return this;
        }

        if (width === null && height === null) {
            return this.withEffect('/preview/');
        }

        const effectiveWidth = Math.min(Math.round(width || MAX_PREVIEW_SIZE), MAX_PREVIEW_SIZE);
        const effectiveHeight = Math.min(Math.round(height || MAX_PREVIEW_SIZE), MAX_PREVIEW_SIZE);
        return this.withEffect(`/preview/${effectiveWidth}x${effectiveHeight}/`);
    };

    resize = (width: number | null = null, height: number | null = null): UploadcareImage => {
        if (width == null && height === null) {
            throw new Error('At least one function argument has to be non-null');
        }

        if (this.isGif()) {
            // Do not resize GIF otherwise it breaks the animation
            return this;
        }

        if (width === null) {
            return this.withEffect(`/resize/x${height}/`);
        }

        if (height === null) {
            return this.withEffect(`/resize/${width}/`);
        }

        return this.withEffect(`/resize/${width}x${height}/`);
    };

    scaleCrop = ({
        center = false,
        height,
        width,
    }: {
        center?: boolean;
        height: number;
        width: number;
    }): UploadcareImage => {
        return this.withEffect(`/scale_crop/${width}x${height}/${center ? 'center/' : ''}`);
    };

    toPrezlyStoragePayload = (): UploadcareImageStoragePayload => ({
        effects: this.effects,
        filename: this.filename,
        mime_type: this.mimeType,
        original_height: this.originalHeight,
        original_width: this.originalWidth,
        size: this.size,
        uuid: this.uuid,
        version: 2,
    });

    toVideo(): UploadcareGifVideo {
        return UploadcareGifVideo.createFromUploadcareImage(this);
    }

    withEffect = (effect: string): UploadcareImage => {
        return new UploadcareImage({
            caption: this.caption,
            effects: [...this.effects, effect],
            filename: this.filename,
            mimeType: this.mimeType,
            originalHeight: this.originalHeight,
            originalWidth: this.originalWidth,
            size: this.size,
            uuid: this.uuid,
        });
    };
}

export default UploadcareImage;
