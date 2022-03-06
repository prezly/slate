import type { Extension } from '@prezly/slate-commons';
import React from 'react';
import type { Editor } from 'slate';
import { Range, Text } from 'slate';

import { SelectionHighlight } from './components';

const SELECTION_MARK = 'selection';

export function RichFormattingMenuExtension(): Extension {
    return {
        id: 'RichFormattingMenuExtension',
        decorate(editor: Editor) {
            return function decorateSelection([node, path]) {
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
            };
        },
        renderLeaf({ leaf, children }) {
            if (leaf[SELECTION_MARK]) {
                return <SelectionHighlight>{children}</SelectionHighlight>
            }

            return <>{children}</>;
        },
    };
}
