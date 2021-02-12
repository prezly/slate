/* eslint-disable no-param-reassign */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { Editor } from 'slate';

import Lists from './Lists';
import { ListsOptions } from './types';
import withLists from './withLists';

export enum ElementType {
    BULLETED_LIST = 'bulleted-list',
    INLINE_ELEMENT = 'inline-element',
    LIST_ITEM = 'list-item',
    LIST_ITEM_TEXT = 'list-item-text',
    NUMBERED_LIST = 'numbered-list',
    UNWRAPPABLE_ELEMENT = 'unwrappable-element',
}

export const options: ListsOptions = {
    defaultBlockType: PARAGRAPH_TYPE,
    listItemTextType: ElementType.LIST_ITEM_TEXT,
    listItemType: ElementType.LIST_ITEM,
    listTypes: [ElementType.BULLETED_LIST, ElementType.NUMBERED_LIST],
    wrappableTypes: [PARAGRAPH_TYPE],
};

export const lists = Lists(options);

const withInlineElement = <T extends Editor>(editor: T): T => {
    const { isInline } = editor;

    editor.isInline = (element) =>
        element.type === ElementType.INLINE_ELEMENT ? true : isInline(element);

    return editor;
};

export const createListsEditor = (input: JSX.Element) =>
    withInlineElement(withLists(options)((input as unknown) as Editor));
