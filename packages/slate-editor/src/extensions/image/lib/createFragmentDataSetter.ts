import { type DataTransferHandler, EditorCommands } from '@prezly/slate-commons';
import { isImageNode } from '@prezly/slate-types';
import { Editor, Range } from 'slate';
import { ReactEditor } from 'slate-react';

import { convertToHtml, encodeSlateFragment } from '#lib';

export function createFragmentDataSetter(editor: Editor): DataTransferHandler {
    return (dataTransfer, next) => {
        if (editor.selection && Range.isCollapsed(editor.selection)) {
            const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

            // Fix copying single captionless image nodes when captions are enabled
            if (
                currentNode &&
                isImageNode(currentNode) &&
                EditorCommands.isNodeEmpty(editor, currentNode) &&
                !Editor.isVoid(editor, currentNode)
            ) {
                const domRange = ReactEditor.toDOMRange(editor, editor.selection);
                const contents = domRange.cloneContents();
                const encodedFragment = encodeSlateFragment(editor.getFragment());

                dataTransfer.setData('application/x-slate-fragment', encodedFragment);
                dataTransfer.setData('text/html', convertToHtml(contents));
                if (contents.textContent) {
                    dataTransfer.setData('text/plain', contents.textContent);
                }
                return;
            }
        }

        next(dataTransfer);
    };
}
