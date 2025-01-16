import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import { SelectionHighlight } from './components';
import { SELECTION_MARK } from './constants';
import { decorateSelectionFactory } from './decorateSelection';

interface Params {
    decorate?: boolean;
}

export function DecorateSelectionExtension({ decorate = true }: Params = {}): Extension {
    return {
        id: 'DecorateSelectionExtension',
        decorate() {
            if (!decorate) {
                return noopDecoration;
            }
            return decorateSelectionFactory();
        },
        renderLeaf({ leaf, children }) {
            if (leaf[SELECTION_MARK]) {
                return <SelectionHighlight>{children}</SelectionHighlight>;
            }

            return <>{children}</>;
        },
    };
}

function noopDecoration() {
    return [];
}
