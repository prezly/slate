import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import { EditorCommands } from '@prezly/slate-commons';
import type { AutoformatRule } from './types';
import { autoformatBlock, autoformatMark, autoformatText } from './transforms';
import { ElementType } from '../editor-v4-rich-formatting';
import { toggleBlock } from '../editor-v4-rich-formatting/lib';
import { DIVIDER_NODE_TYPE, QUOTE_NODE_TYPE } from '@prezly/slate-types';
import { MarkType } from '../editor-v4-rich-formatting/types';

export const withAutoformat = <T extends BaseEditor & ReactEditor & HistoryEditor>(
    editor: T,
): T => {
    const { insertText } = editor;

    const autoformatters = {
        block: autoformatBlock,
        mark: autoformatMark,
        text: autoformatText,
    };

    editor.insertText = (text) => {
        if (!EditorCommands.isSelectionEmpty(editor)) return insertText(text);

        for (const rule of rules) {
            const { mode = 'text', insertTrigger, query } = rule;

            if (query && !query(editor, { ...rule, text })) continue;

            const formatter = autoformatters[mode];
            const formatResult = formatter?.(editor, { ...(rule as any), text });

            if (formatResult) {
                return insertTrigger && insertText(text);
            }
        }

        insertText(text);
    };

    return editor;
};

const rules: AutoformatRule[] = [
    {
        mode: 'text',
        match: ['(tm)', '(TM)'],
        format: '™',
    },
    {
        mode: 'mark',
        type: MarkType.BOLD,
        match: '**',
    },
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
            return toggleBlock(editor, ElementType.NUMBERED_LIST);
        },
    },
    {
        mode: 'block',
        type: ElementType.BULLETED_LIST,
        match: ['-', '*'],
        format: (editor) => {
            return toggleBlock(editor, ElementType.BULLETED_LIST);
        },
    },
    {
        mode: 'block',
        type: ElementType.HEADING_ONE,
        match: '# ',
        format: (editor) => {
            return toggleBlock(editor, ElementType.HEADING_ONE);
        },
    },
    {
        mode: 'block',
        type: ElementType.HEADING_TWO,
        match: '## ',
        format: (editor) => {
            return toggleBlock(editor, ElementType.HEADING_TWO);
        },
    },
    {
        mode: 'block',
        type: QUOTE_NODE_TYPE,
        match: '> ',
        format: (editor) => {
            return toggleBlock(editor, QUOTE_NODE_TYPE);
        },
    },
];
