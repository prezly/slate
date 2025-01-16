import { EditorCommands } from '@prezly/slate-commons';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { type Node, type Path, type Point, RangeApi, type SlateEditor } from '@udecode/plate';
import type { KeyboardEvent } from 'react';

import { isDeletingEventBackward } from './isDeletingEvent';

export function onBackspaceResetFormattingAtDocumentStart(
    editor: SlateEditor,
    match: (node: Node) => boolean,
    event: KeyboardEvent,
): boolean | void {
    const { selection } = editor;
    if (
        isDeletingEventBackward(event) &&
        selection !== null &&
        RangeApi.isCollapsed(selection) &&
        isDocumentStart(selection.focus)
    ) {
        if (isFocused(editor, match)) {
            editor.tf.setNodes(
                { type: PARAGRAPH_NODE_TYPE },
                {
                    match: (node, path) => match(node) && EditorCommands.isTopLevelNode(node, path),
                },
            );
            return true;
        }
    }
}

function isDocumentStart(focus: Point): boolean {
    return (
        focus.offset === 0 &&
        // Any node at path [0, ..., 0] is considered the start of the document
        focus.path.every((index) => index === 0)
    );
}

function isFocused(editor: SlateEditor, match: (node: Node, path: Path) => boolean): boolean {
    return Array.from(editor.api.nodes({ match })).length > 0;
}
