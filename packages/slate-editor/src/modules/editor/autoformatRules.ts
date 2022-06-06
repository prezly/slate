import type { HeadingNode, ListNode, QuoteNode } from '@prezly/slate-types';
import {
    BULLETED_LIST_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';

import type { AutoformatRule } from '#extensions/autoformat';
import { ElementType, MarkType } from '#extensions/text-styling';
import { toggleBlock } from '#modules/rich-formatting-menu';

export const compositeCharactersRules: AutoformatRule[] = [
    {
        mode: 'text',
        match: ['(tm)', '(TM)'],
        format: '™',
    },
    {
        mode: 'text',
        match: ['(r)', '(R)'],
        format: '®',
    },
    {
        mode: 'text',
        match: ['(c)', '(C)'],
        format: '©',
    },
    {
        mode: 'text',
        match: '--',
        format: '\u2014',
    },
    {
        mode: 'text',
        match: '...',
        format: '…',
    },
    {
        mode: 'text',
        match: '->',
        format: '→',
    },
    {
        mode: 'text',
        match: '<-',
        format: '←',
    },
    {
        mode: 'text',
        match: '=>',
        format: '⇒',
    },
    {
        mode: 'text',
        match: '<=',
        format: '⇐',
    },
];

export const textStyleRules: AutoformatRule[] = [
    {
        mode: 'mark',
        type: MarkType.BOLD,
        match: '**',
    },
    {
        mode: 'mark',
        type: MarkType.ITALIC,
        match: '*',
    },
    {
        mode: 'mark',
        type: MarkType.UNDERLINED,
        match: '_',
    },
];

export const blockRules: AutoformatRule[] = [
    {
        mode: 'block',
        type: DIVIDER_NODE_TYPE,
        match: '---',
    },
    {
        mode: 'block',
        type: ElementType.NUMBERED_LIST,
        match: '1.',
        format: (editor) => {
            return toggleBlock<ListNode>(editor, NUMBERED_LIST_NODE_TYPE);
        },
    },
    {
        mode: 'block',
        type: ElementType.BULLETED_LIST,
        match: ['-', '*'],
        format: (editor) => {
            return toggleBlock<ListNode>(editor, BULLETED_LIST_NODE_TYPE);
        },
    },
    {
        mode: 'block',
        type: ElementType.HEADING_ONE,
        match: '#',
        format: (editor) => {
            return toggleBlock<HeadingNode>(editor, HEADING_1_NODE_TYPE);
        },
    },
    {
        mode: 'block',
        type: ElementType.HEADING_TWO,
        match: '##',
        format: (editor) => {
            return toggleBlock<HeadingNode>(editor, HEADING_2_NODE_TYPE);
        },
    },
    {
        mode: 'block',
        type: QUOTE_NODE_TYPE,
        match: '>',
        format: (editor) => {
            return toggleBlock<QuoteNode>(editor, QUOTE_NODE_TYPE);
        },
    },
];
