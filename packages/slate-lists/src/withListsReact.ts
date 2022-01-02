/* eslint-disable no-param-reassign */

import type { ReactEditor } from 'slate-react';

import { cloneContentsMonkeyPatch } from './lib';

/**
 * Enables Range.prototype.cloneContents monkey patch to improve pasting behavior
 * in few edge cases.
 */
export function withListsReact<T extends ReactEditor>(editor: T): T {
    const { setFragmentData } = editor;

    editor.setFragmentData = (data: DataTransfer) => {
        cloneContentsMonkeyPatch.activate();
        setFragmentData(data);
        cloneContentsMonkeyPatch.deactivate();
    };

    return editor;
}

