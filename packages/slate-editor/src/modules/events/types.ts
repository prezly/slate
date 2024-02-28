import type { Listener } from '@prezly/events';
import type {
    CoverageEntry,
    NewsroomContact,
    NewsroomGallery,
    OEmbedInfo,
    Story,
} from '@prezly/sdk';
import type { Node, TableHeader } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export type EditorEventMap = {
    undo: never;
    redo: never;
    'add-button-menu-opened': {
        trigger: 'click' | 'hotkey' | 'input';
    };
    'add-button-menu-closed': never;
    'add-button-menu-filtered': {
        query: string;
        resultsCount: number;
    };
    'add-button-menu-option-click': {
        title: string;
        action: string;
        suggested: boolean;
        query: string;
    };
    'attachment-added': {
        description: string;
        isPasted: boolean;
        mimeType: string;
        size: number;
        uuid: string;
        trigger: string;
    };
    'attachment-edited': {
        description: string;
        mimeType: string;
        size: number;
        uuid: string;
    };
    'attachment-removed': {
        uuid: string;
    };
    'web-bookmark-converted': {
        to: 'link' | 'embed' | 'card';
        element: Node;
    };
    'embed-converted': {
        to: 'link' | 'embed' | 'card';
        element: Node;
    };
    'link-converted': {
        to: 'link' | 'embed' | 'card';
        element: Node;
    };
    'video-converted': {
        to: 'link' | 'embed' | 'card';
        element: Node;
    };
    'button-block-removed': {
        uuid: string;
    };
    'contact-placeholder-submitted': {
        contact: Pick<NewsroomContact, 'uuid'>;
    };
    'coverage-placeholder-submitted': {
        coverage: Pick<CoverageEntry, 'id'>;
    };
    'coverage-removed': never;
    'embed-placeholder-submitted': {
        url: string;
    };
    'empty-paragraph-inserted': { trigger: 'hotkey' | 'area-around-block' };
    error: unknown;
    'files-pasted': {
        filesCount: number;
        isEmpty: boolean;
    };
    'gallery-images-added': {
        imagesCount: number;
    };
    'gallery-images-shuffled': {
        imagesCount: number;
    };
    'gallery-bookmark-placeholder-submitted': {
        gallery: Pick<NewsroomGallery, 'uuid'>;
    };
    'image-added': {
        description: string;
        isPasted: boolean;
        mimeType: string;
        size: number;
        uuid: string;
        trigger: string;
    };
    'image-edit-clicked': never;
    'image-edited': {
        description: string;
        mimeType: string;
        size: number;
        uuid: string;
        operation: string;
        trigger: string;
    };
    'image-removed': {
        uuid: string;
    };
    'images-pasted': {
        imagesCount: number;
        isEmpty: boolean;
    };
    notification:
        | {
              children?: ReactNode;
              type: 'error';
          }
        | {
              children: ReactNode;
              type: 'information' | 'success' | 'warning';
          };
    paste: {
        isEmpty: boolean;
        pastedLength: number;
    };
    'story-embed-placeholder-submitted': {
        story: Pick<Story, 'uuid'>;
    };
    'story-bookmark-placeholder-submitted': {
        story: Pick<Story, 'uuid'>;
    };
    'story-bookmark-removed': {
        uuid: string;
    };
    'snippet-dialog-opened': never;
    'snippet-dialog-submitted': never;
    'table-insert': never;
    'table-toggle-header': {
        headerType: TableHeader;
        newValue: boolean;
    };
    'table-insert-row-above': never;
    'table-insert-row-below': never;
    'table-remove-row': never;
    'table-insert-column-left': never;
    'table-insert-column-right': never;
    'table-remove-column': never;
    'table-remove': never;
    'unfurl-pasted-url': {
        url: string;
        oembed?: OEmbedInfo;
        fallback?: string;
    };
    'video-placeholder-submitted': {
        url: string;
    };
    'web-bookmark-placeholder-submitted': {
        url: string;
    };
    'web-bookmark-removed': {
        uuid: string;
    };
};

export type EditorEventHandlers = {
    [key in keyof EditorEventMap]: Listener<EditorEventMap[key]>;
};
