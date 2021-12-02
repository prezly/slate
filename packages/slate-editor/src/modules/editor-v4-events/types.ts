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
    'web-bookmark-dialog-opened': {
        selectedItemText: string;
    };
    'web-bookmark-dialog-submitted': {
        selectedItemText: string;
        url: string;
    };
    'web-bookmark-removed': {
        uuid: string;
    };
};

export type EditorEventHandlers = {
    [key in keyof EditorEventMap]: Listener<EditorEventMap[key]>;
};
