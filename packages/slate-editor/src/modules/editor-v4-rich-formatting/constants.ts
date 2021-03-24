import { PARAGRAPH_TYPE } from '@prezly/slate-commons';

import { ElementType } from './types';

export const RICH_FORMATTING_EXTENSION_ID = 'RichFormattingExtension';

export const RICH_TEXT_BLOCK_TYPES = [
    ElementType.BLOCK_QUOTE,
    ElementType.BULLETED_LIST,
    ElementType.HEADING_ONE,
    ElementType.HEADING_TWO,
    ElementType.NUMBERED_LIST,
    PARAGRAPH_TYPE,
];

export const RICH_TEXT_TYPES = [
    ...RICH_TEXT_BLOCK_TYPES,
    ElementType.LIST_ITEM,
    ElementType.LIST_ITEM_TEXT,
];
