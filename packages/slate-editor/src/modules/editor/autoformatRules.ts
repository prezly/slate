// import type { HeadingNode, ListNode, QuoteNode } from '@prezly/slate-types';
// import { CalloutNode } from '@prezly/slate-types';
// import {
//     BULLETED_LIST_NODE_TYPE,
//     DIVIDER_NODE_TYPE,
//     HEADING_1_NODE_TYPE,
//     HEADING_2_NODE_TYPE,
//     NUMBERED_LIST_NODE_TYPE,
//     QUOTE_NODE_TYPE,
// } from '@prezly/slate-types';

// import type { AutoformatRule } from '#extensions/autoformat';
// import { MarkType } from '#extensions/text-styling';
// import { toggleBlock } from '#modules/rich-formatting-menu';

// export const COMPOSITE_CHARACTERS_RULES: AutoformatRule[] = [
//     {
//         mode: 'text',
//         match: ['(tm)', '(TM)'],
//         format: '™',
//     },
//     {
//         mode: 'text',
//         match: ['(r)', '(R)'],
//         format: '®',
//     },
//     {
//         mode: 'text',
//         match: ['(c)', '(C)'],
//         format: '©',
//     },
//     {
//         mode: 'text',
//         match: '--',
//         format: '\u2014',
//     },
//     {
//         mode: 'text',
//         match: '...',
//         format: '…',
//     },
//     {
//         mode: 'text',
//         match: '->',
//         format: '→',
//     },
//     {
//         mode: 'text',
//         match: '<-',
//         format: '←',
//     },
//     {
//         mode: 'text',
//         match: '=>',
//         format: '⇒',
//     },
//     {
//         mode: 'text',
//         match: '<=',
//         format: '⇐',
//     },
// ];

// export const TEXT_STYLE_RULES: AutoformatRule[] = [
//     {
//         mode: 'mark',
//         type: MarkType.BOLD,
//         match: '**',
//     },
//     {
//         mode: 'mark',
//         type: MarkType.ITALIC,
//         match: '*',
//     },
//     {
//         mode: 'mark',
//         type: MarkType.UNDERLINED,
//         match: '_',
//     },
// ];

// export const DIVIDER_RULES: AutoformatRule[] = [
//     {
//         mode: 'block',
//         type: DIVIDER_NODE_TYPE,
//         match: '---',
//     },
// ];

// export const LIST_RULES: AutoformatRule[] = [
//     {
//         mode: 'block',
//         type: NUMBERED_LIST_NODE_TYPE,
//         match: '1.',
//         format: (editor) => {
//             return toggleBlock<ListNode>(editor, NUMBERED_LIST_NODE_TYPE);
//         },
//     },
//     {
//         mode: 'block',
//         type: BULLETED_LIST_NODE_TYPE,
//         match: ['-', '*'],
//         format: (editor) => {
//             return toggleBlock<ListNode>(editor, BULLETED_LIST_NODE_TYPE);
//         },
//     },
// ];

// export const HEADING_RULES: AutoformatRule[] = [
//     {
//         mode: 'block',
//         type: HEADING_1_NODE_TYPE,
//         match: '#',
//         format: (editor) => {
//             return toggleBlock<HeadingNode>(editor, HEADING_1_NODE_TYPE);
//         },
//     },
//     {
//         mode: 'block',
//         type: HEADING_2_NODE_TYPE,
//         match: '##',
//         format: (editor) => {
//             return toggleBlock<HeadingNode>(editor, HEADING_2_NODE_TYPE);
//         },
//     },
// ];

// export const BLOCKQUOTE_RULES: AutoformatRule[] = [
//     {
//         mode: 'block',
//         type: QUOTE_NODE_TYPE,
//         match: '>',
//         format: (editor) => {
//             return toggleBlock<QuoteNode>(editor, QUOTE_NODE_TYPE);
//         },
//     },
// ];

// export const CALLOUT_RULES: AutoformatRule[] = [
//     {
//         mode: 'block',
//         type: CalloutNode.TYPE,
//         match: '!',
//         format: (editor) => {
//             return toggleBlock<CalloutNode>(editor, CalloutNode.TYPE, {
//                 icon: '💡',
//             });
//         },
//     },
// ];
