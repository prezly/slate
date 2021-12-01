import type { Listener } from '@prezly/events';
import type { Coverage } from '@prezly/sdk';
import type { PressContact } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export type EditorEventMap = {
    'attachment-add-clicked': never;
    'attachment-added': {
        description: string;
        isPasted: boolean;
        mimeType: string;
        size: number;
        uuid: string;
    };
    'attachment-edit-clicked': never;
    'attachment-edited': {
        description: string;
        mimeType: string;
        size: number;
        uuid: string;
    };
    'attachment-removed': {
        uuid: string;
    };
    'contact-dialog-opened': never;
    'contact-dialog-search-used': never;
    'contact-dialog-submitted': {
        contact_id: PressContact['id'];
    };
    'contact-removed': {
        contact_id: PressContact['id'];
    };
    'coverage-dialog-opened': never;
    'coverage-dialog-search-used': never;
    'coverage-dialog-submitted': {
        coverage_id: Coverage['id'];
    };
    'coverage-removed': never;
    'embed-dialog-opened': {
        selectedItemText: string;
    };
    'embed-dialog-submitted': {
        selectedItemText: string;
        url: string;
    };
    'embed-removed': {
        uuid: string;
    };
    error: unknown;
    'files-pasted': {
        filesCount: number;
        imagesCount: number;
        isEmpty: boolean;
        slateVersion: string | undefined;
    };
    'image-add-clicked': never;
    'image-added': {
        description: string;
        isPasted: boolean;
        mimeType: string;
        size: number;
        uuid: string;
    };
    'image-edit-clicked': never;
    'image-edited': {
        description: string;
        mimeType: string;
        size: number;
        uuid: string;
    };
    'image-removed': {
        uuid: string;
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
        slateVersion: string | undefined;
    };
    'video-dialog-opened': {
        selectedItemText: string;
    };
    'video-dialog-submitted': {
        selectedItemText: string;
        href: string;
    };
    'video-removed': {
        uuid: string;
    };
    'web-bookmark-dialog-opened': {
        selectedItemText: string;
    };
    'web-bookmark-dialog-submitted': {
        selectedItemText: string;
        href: string;
    };
    'web-bookmark-removed': {
        uuid: string;
    };
};

/**
 * TODO: automatically generate this interface based on EditorEventMap
 */
export interface EditorEventHandlers extends Record<keyof EditorEventMap, unknown> {
    'attachment-add-clicked': Listener<EditorEventMap['attachment-add-clicked']>;
    'attachment-added': Listener<EditorEventMap['attachment-added']>;
    'attachment-edit-clicked': Listener<EditorEventMap['attachment-edit-clicked']>;
    'attachment-edited': Listener<EditorEventMap['attachment-edited']>;
    'attachment-removed': Listener<EditorEventMap['attachment-removed']>;
    'contact-dialog-opened': Listener<EditorEventMap['contact-dialog-opened']>;
    'contact-dialog-search-used': Listener<EditorEventMap['contact-dialog-search-used']>;
    'contact-dialog-submitted': Listener<EditorEventMap['contact-dialog-submitted']>;
    'contact-removed': Listener<EditorEventMap['contact-removed']>;
    'coverage-dialog-opened': Listener<EditorEventMap['coverage-dialog-opened']>;
    'coverage-dialog-search-used': Listener<EditorEventMap['coverage-dialog-search-used']>;
    'coverage-dialog-submitted': Listener<EditorEventMap['coverage-dialog-submitted']>;
    'coverage-removed': Listener<EditorEventMap['coverage-removed']>;
    'embed-dialog-opened': Listener<EditorEventMap['embed-dialog-opened']>;
    'embed-dialog-submitted': Listener<EditorEventMap['embed-dialog-submitted']>;
    'embed-removed': Listener<EditorEventMap['embed-removed']>;
    error: Listener<EditorEventMap['error']>;
    'files-pasted': Listener<EditorEventMap['files-pasted']>;
    'image-add-clicked': Listener<EditorEventMap['image-add-clicked']>;
    'image-added': Listener<EditorEventMap['image-added']>;
    'image-edit-clicked': Listener<EditorEventMap['image-edit-clicked']>;
    'image-edited': Listener<EditorEventMap['image-edited']>;
    'image-removed': Listener<EditorEventMap['image-removed']>;
    notification: Listener<EditorEventMap['notification']>;
    paste: Listener<EditorEventMap['paste']>;
}
