import type { NewsroomRef } from '@prezly/sdk';
import type { UPLOADCARE_FILE_DATA_KEY } from '@prezly/uploadcare';
import type { FilePromise } from '@prezly/uploadcare-widget';
import type { SlateEditor } from '@udecode/plate';

interface File {
    [UPLOADCARE_FILE_DATA_KEY]?: {
        caption: string;
    };
    cdnUrl: string;
}

export type ResultPromise<Multiple extends boolean> = Multiple extends true
    ? FilePromise[]
    : [FilePromise];

export type UploadcareOptions<
    Multiple extends boolean,
    ImagesOnly extends boolean,
    MediaGallery extends boolean,
> = {
    captions?: boolean;
    crop?: ImagesOnly extends true ? boolean : never;
    files?: File[];
    imagesOnly?: ImagesOnly;
    multiple?: Multiple;
    tabs?: string[];
} & MediaGalleryOptions<MediaGallery>;

export type MediaGalleryOptions<MediaGallery extends boolean> = MediaGallery extends true
    ? {
          mediaGalleryTab: true;
          newsroom: NewsroomRef;
      }
    : {
          mediaGalleryTab?: false;
          newsroom?: never;
      };

export interface Uploadcare {
    upload<Multiple extends boolean, ImagesOnly extends boolean, MediaGallery extends boolean>(
        editor: SlateEditor,
        options: UploadcareOptions<Multiple, ImagesOnly, MediaGallery>,
    ): Promise<ResultPromise<Multiple>>;
}
