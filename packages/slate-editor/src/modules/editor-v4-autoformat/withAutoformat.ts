import { EditorCommands } from '@prezly/slate-commons';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

import { autoformatBlock, autoformatMark, autoformatText } from './transforms';
import type { AutoformatRule } from './types';

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
        insertText(text);

        if (text !== ' ') {
            return;
        }

        const textBefore = EditorCommands.getPrevChars(editor, 2).slice(0, -1);

        for (const rule of rules) {
            const { mode = 'text', query } = rule;

            if (query && !query(editor, { ...rule, text })) continue;

            if (editor.selection) {
                const formatter = autoformatters[mode];

                const formatResult = formatter?.(editor, {
                    ...(rule as any),
                    text: textBefore,
                });

                if (formatResult) {
                    return;
                }
            }
        }
    };

    return editor;
};
