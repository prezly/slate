import { useRegisterExtension } from '@prezly/slate-commons';
import React from 'react';
import type { Editor } from 'slate';

import { SelectionHighlight } from './components';
import { SELECTION_MARK } from './constants';
import { decorateSelectionFactory } from './decorateSelection';

interface Params {
    decorate?: boolean;
}

export function DecorateSelectionExtension({ decorate = true }: Params = {}) {
    return useRegisterExtension({
        id: 'DecorateSelectionExtension',
        decorate(editor: Editor) {
            if (!decorate) {
                return noopDecoration;
            }
            return decorateSelectionFactory(editor);
        },
        renderLeaf({ leaf, children }) {
            if (leaf[SELECTION_MARK]) {
                return <SelectionHighlight>{children}</SelectionHighlight>;
            }

            return <>{children}</>;
        },
    });
}

function noopDecoration() {
    return [];
}
