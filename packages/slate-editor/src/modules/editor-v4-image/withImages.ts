/* eslint-disable no-param-reassign */

import { EditorCommands, encodeSlateFragment } from '@prezly/slate-commons';
import { Editor, Range } from 'slate';
import { ReactEditor } from 'slate-react';

import { convertToHtml } from '../../lib';

import { isImageElement } from './lib';

const withImages = <T extends ReactEditor>(editor: T): T => {
    const { insertData, setFragmentData } = editor;

    editor.setFragmentData = (data): void => {
        if (editor.selection && Range.isCollapsed(editor.selection)) {
            const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

            // Fix copying sole, captionless image nodes when captions are enabled
            if (
                currentNode &&
                isImageElement(currentNode) &&
                EditorCommands.isNodeEmpty(editor, currentNode) &&
                !Editor.isVoid(editor, currentNode)
            ) {
                const domRange = ReactEditor.toDOMRange(editor, editor.selection);
                const contents = domRange.cloneContents();
                const encodedFragment = encodeSlateFragment(editor.getFragment());
                data.setData('application/x-slate-fragment', encodedFragment);
                data.setData('text/html', convertToHtml(contents));
                if (contents.textContent) {
                    data.setData('text/plain', contents.textContent);
                }
                return;
            }
        }

        setFragmentData(data);
    };

    editor.insertData = (data: DataTransfer) => {
        insertData(data);

        // Make sure `normalizeImageCandidate` is called after pasting content
        // into the editor. Because sometimes it's not.
        Editor.normalize(editor, { force: true });
    };

    return editor;
};

export default withImages;
