import { Transforms } from 'slate';
import type { NodeEntry } from 'slate';
import type { Editor } from 'slate';

import { createParagraph } from '#extensions/paragraphs';
import { createTableCellNode, createTableRowNode } from '#extensions/tables';

export function insertTableRow(editor: Editor, [node, path]: NodeEntry) {
    Transforms.insertNodes(
        editor,
        [
            createTableRowNode({
                children: [createTableCellNode({ children: [createParagraph()] })],
            }),
        ],
        {
            at: path,
            match: (n) => n === node,
        },
    );

    return true;
}
