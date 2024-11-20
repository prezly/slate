import { EditorCommands } from '@prezly/slate-commons';
import { isImageNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import { toDOMRange } from '@udecode/plate-common/react';
import { Range } from 'slate';

import { convertToHtml, encodeSlateFragment } from '#lib';

export function withImages<T extends SlateEditor>(editor: T): T {
    const { setFragmentData } = editor;

    editor.setFragmentData = (data): void => {
        if (editor.selection && Range.isCollapsed(editor.selection)) {
            const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

            // Fix copying single captionless image nodes when captions are enabled
            if (
                currentNode &&
                isImageNode(currentNode) &&
                EditorCommands.isNodeEmpty(editor, currentNode) &&
                !editor.isVoid(currentNode)
            ) {
                const domRange = toDOMRange(editor, editor.selection);
                const contents = domRange!.cloneContents();
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

    return editor;
}
