/* eslint-disable no-param-reassign */

import { Editor } from 'slate';

import {
    normalizeList,
    normalizeListChildren,
    normalizeListItemChildren,
    normalizeListItemTextChildren,
    normalizeOrphanListItem,
    normalizeOrphanListItemText,
    normalizeOrphanNestedList,
    normalizeSiblingLists,
} from './lib';
import { ListsOptions } from './types';

const normalizers = [
    normalizeList,
    normalizeListChildren,
    normalizeListItemChildren,
    normalizeListItemTextChildren,
    normalizeOrphanListItem,
    normalizeOrphanListItemText,
    normalizeOrphanNestedList,
    normalizeSiblingLists,
];

/**
 * Enables normalizations that enforce schema constraints and recover from unsupported cases.
 */
const withLists = (options: ListsOptions) => <T extends Editor>(editor: T): T => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        for (const normalizer of normalizers) {
            const normalized = normalizer(options, editor, entry);

            if (normalized) {
                return;
            }
        }

        normalizeNode(entry);
    };

    return editor;
};

export default withLists;
