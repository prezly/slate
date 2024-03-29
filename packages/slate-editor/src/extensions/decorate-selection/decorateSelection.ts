import type { Decorate } from '@prezly/slate-commons';
import type { Editor, NodeEntry } from 'slate';
import { Range, Text } from 'slate';

import { SELECTION_MARK } from './constants';

export function decorateSelection(editor: Editor, [node, path]: NodeEntry) {
    if (editor.selection && Range.isExpanded(editor.selection) && Text.isText(node)) {
        const intersection = Range.intersection(editor.selection, {
            anchor: { path, offset: 0 },
            focus: { path, offset: node.text.length },
        });
        if (intersection) {
            return [{ ...intersection, [SELECTION_MARK]: true }];
        }
    }
    return [];
}

export function decorateSelectionFactory(editor: Editor): Decorate {
    return (entry) => decorateSelection(editor, entry);
}
