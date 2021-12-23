import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import { EditorCommands } from '@prezly/slate-commons';
import type { AutoformatRule } from './types';
import { autoformatBlock, autoformatMark, autoformatText } from './transforms';

export const withAutoformat = <T extends BaseEditor & ReactEditor & HistoryEditor>(
    editor: T,
    rules: AutoformatRule[],
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
