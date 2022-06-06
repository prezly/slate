import { EditorCommands } from '@prezly/slate-commons';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { KeyboardEvent } from 'react';
import type { Node, Path, Point} from 'slate';
import { Editor, Range, Transforms } from 'slate';

import { isDeletingEventBackward } from './isDeletingEvent';

export function onBackspaceResetFormattingAtDocumentStart(
    editor: Editor,
    match: (node: Node) => boolean,
    event: KeyboardEvent,
) {
    const { selection } = editor;
    if (
        isDeletingEventBackward(event) &&
        selection !== null &&
        Range.isCollapsed(selection) &&
        isDocumentStart(selection.focus)
    ) {
        if (isFocused(editor, match)) {
            Transforms.setNodes(
                editor,
                { type: PARAGRAPH_NODE_TYPE },
                {
                    match: (node, path) => match(node) && EditorCommands.isTopLevelNode(node, path),
                },
            );
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

function isFocused(editor: Editor, match: (node: Node, path: Path) => boolean): boolean {
    return Array.from(Editor.nodes(editor, { match })).length > 0;
}
