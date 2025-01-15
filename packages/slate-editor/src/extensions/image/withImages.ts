import { EditorCommands } from '@prezly/slate-commons';
import { isImageNode } from '@prezly/slate-types';
import { RangeApi, type SlateEditor } from '@udecode/plate';

import { convertToHtml, encodeSlateFragment } from '#lib';

export function withImages<T extends SlateEditor>(editor: T): T {
    const { setFragmentData } = editor;

    editor.setFragmentData = (data): void => {
        if (editor.selection && RangeApi.isCollapsed(editor.selection)) {
            const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

            // Fix copying single captionless image nodes when captions are enabled
            if (
                currentNode &&
                isImageNode(currentNode) &&
                EditorCommands.isNodeEmpty(editor, currentNode) &&
                !editor.api.isVoid(currentNode)
            ) {
                const domRange = editor.api.toDOMRange(editor.selection);
                if (!domRange) {
                    return;
                }
                const contents = domRange.cloneContents();
                const encodedFragment = encodeSlateFragment(editor.api.getFragment());
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
