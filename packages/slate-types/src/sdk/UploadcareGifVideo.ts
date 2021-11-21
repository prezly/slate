import { UPLOADCARE_CDN_URL } from '../constants';

import type { UploadcareImage } from './UploadcareImage';

type Quality = 'lightest' | 'lighter' | 'normal' | 'better' | 'best';

type VideoFormat = 'mp4' | 'webm';

export class UploadcareGifVideo {
    public static createFromUploadcareImage(image: UploadcareImage): UploadcareGifVideo {
        // The `gif2video` transformation is supported only for gifs,
        // otherwise the server responds with "400 Bad Request".
        if (!image.isGif()) {
            throw new Error('You can only convert a GIF to video');
        }

        return new UploadcareGifVideo({
            effects: image.effects,
            filename: image.filename,
            height: image.originalHeight,
            uuid: image.uuid,
            width: image.originalWidth,
        });
    }
    private effects: string[];

    private filename: string;

    private uuid: string;

    public height: number;

    public width: number;

    constructor({
        effects = [],
        filename,
        height,
        uuid,
        width,
    }: {
        effects: string[];
        filename: string;
        height: number;
        uuid: string;
        width: number;
    }) {
        this.effects = effects;
        this.filename = filename;
        this.height = height;
        this.uuid = uuid;
        this.width = width;
    }

    public format(format: VideoFormat): UploadcareGifVideo {
        /** @see https://uploadcare.com/docs/image_transformations/gif2video/#gif2video-format */
        return this.withEffect(`/format/${format}/`);
    }

    public quality(quality: Quality): UploadcareGifVideo {
        /** @see https://uploadcare.com/docs/image_transformations/gif2video/#gif2video-quality */
        return this.withEffect(`/quality/${quality}/`);
    }

    public bestQuality(): UploadcareGifVideo {
        return this.quality('best');
    }

    private withEffect(effect: string): UploadcareGifVideo {
        return new UploadcareGifVideo({
            effects: [...this.effects, effect],
            filename: this.filename,
            height: this.height,
            uuid: this.uuid,
            width: this.width,
        });
    }

    public get aspectRatio(): number {
        return this.width / this.height;
    }

    public get cdnUrl(): string {
        const cdnUrl = [
            UPLOADCARE_CDN_URL,
            this.uuid,
            'gif2video',
            // Prepend a dash only if effects exist.
            // It doesn't matter if there's a dash at the end of URL even if there are no effects,
            // but it looks cleaner without it.
            this.effects.length === 0 ? this.effects : ['', ...this.effects].join('-'),
        ].join('/');

        return `${cdnUrl}${encodeURIComponent(this.filename)}`;
    }
}
