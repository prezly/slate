import type { BaseEditor, Editor, Location, Range } from 'slate';
import { Transforms } from 'slate';

import findLeafLocation from './findLeafLocation';
import isValidLocation from './isValidLocation';

interface Actions {
    /**
     * @returns {boolean} True if the selection is successfully restored, or false if not.
     */
    restore: (editor: Editor) => boolean;
}

function createRestore(location: Location | null): Actions['restore'] {
    return (editor: Editor): boolean => {
        /* We have to make sure to set the selection to leaf nodes, otherwise
         * Slate may start throwing errors such as:
         * "Cannot get the leaf node at path [${path}] because it refers to a non-leaf node: ${node}"
         * It may happen when calling `Editor.marks`.
         * See: https://app.clubhouse.io/prezly/story/19544/editor-crashes-when-pressing-del-in-an-empty-paragraph-before-a-list
         */
        const locationLeaf = location && findLeafLocation(editor, location);

        if (locationLeaf && isValidLocation(editor, locationLeaf)) {
            Transforms.select(editor, locationLeaf);
            return true;
        }

        return false;
    };
}

function saveSelection(
    editor: BaseEditor,
    transformLocation: (selection: Range) => Location = (selection) => selection,
): Actions {
    const savedSelection = editor.selection && transformLocation(editor.selection);

    return {
        restore: createRestore(savedSelection),
    };
}

export default saveSelection;
