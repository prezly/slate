import type { Decorate } from '@prezly/slate-commons';
import { RangeApi, TextApi } from '@udecode/plate';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { SELECTION_MARK } from './constants';

export function decorateSelection(editor: SlateEditor, [node, path]: NodeEntry) {
    if (editor.selection && editor.api.isExpanded() && TextApi.isText(node)) {
        const intersection = RangeApi.intersection(editor.selection, {
            anchor: { path, offset: 0 },
            focus: { path, offset: node.text.length },
        });
        if (intersection) {
            return [{ ...intersection, [SELECTION_MARK]: true }];
        }
    }
    return [];
}

export function decorateSelectionFactory(): Decorate {
    return ({ editor, entry }) => decorateSelection(editor, entry);
}
