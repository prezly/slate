import type { Element } from 'slate';

import type { ListsOptions } from '../types';

function createDefaultNode(options: ListsOptions): Element {
    return {
        children: [],
        // @prezly/slate-lists package should not assume what default block type is.
        // It is up to @prezly/slate-lists package user to ensure that they pass correct options
        type: options.defaultBlockType as any,
    };
}

export default createDefaultNode;
