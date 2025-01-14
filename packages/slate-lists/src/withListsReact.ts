/* eslint-disable no-param-reassign */

import type { SlateEditor } from '@udecode/plate-common';

import { withRangeCloneContentsPatched } from './util';

/**
 * Enables Range.prototype.cloneContents monkey patch to improve pasting behavior
 * in few edge cases.
 */
export function withListsReact<T extends SlateEditor>(editor: T): T {
    const { setFragmentData } = editor;

    editor.setFragmentData = (data: DataTransfer) => {
        withRangeCloneContentsPatched(function () {
            setFragmentData(data);
        });
    };

    return editor;
}
