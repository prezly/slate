import type { Decorate } from '@prezly/slate-commons';
import { isExpanded, isText} from '@udecode/plate-common';
import type { SlateEditor, TNodeEntry } from '@udecode/plate-common';
import { Range } from 'slate';

import { SELECTION_MARK } from './constants';

export function decorateSelection(editor: SlateEditor, [node, path]: TNodeEntry) {
    if (editor.selection && isExpanded(editor.selection) && isText(node)) {
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

export function decorateSelectionFactory(): Decorate {
    return ({ editor, entry }) => decorateSelection(editor, entry);
}
