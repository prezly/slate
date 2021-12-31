import type { ListsOptions } from '@prezly/slate-lists';
import { Lists } from '@prezly/slate-lists';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

import { ElementType } from './types';

export const options: ListsOptions = {
    defaultBlockType: PARAGRAPH_NODE_TYPE,
    listItemTextType: ElementType.LIST_ITEM_TEXT,
    listItemType: ElementType.LIST_ITEM,
    listTypes: [ElementType.BULLETED_LIST, ElementType.NUMBERED_LIST],
    wrappableTypes: [
        PARAGRAPH_NODE_TYPE,
        ElementType.BLOCK_QUOTE,
        ElementType.HEADING_ONE,
        ElementType.HEADING_TWO,
    ],
};

export default Lists(options);
