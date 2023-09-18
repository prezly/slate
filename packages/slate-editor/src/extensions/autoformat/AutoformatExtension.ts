import type { TextInsertionHandler } from '@prezly/slate-commons';
import { EditorCommands, useRegisterExtension } from '@prezly/slate-commons';
import { isParagraphNode } from '@prezly/slate-types';
import { useCallback } from 'react';
import { useSlateStatic } from 'slate-react';

import { useLatest } from '#lib';

import { autoformatBlock, autoformatMark, autoformatText } from './transforms';
import type { AutoformatParameters } from './types';

export const EXTENSION_ID = 'AutoformatExtension';

const AUTOFORMATTERS = {
    block: autoformatBlock,
    mark: autoformatMark,
    text: autoformatText,
};

export function AutoformatExtension(params: AutoformatParameters) {
    const editor = useSlateStatic();
    const refs = useLatest(params);

    const insertText = useCallback<TextInsertionHandler>((text, next) => {
        next(text);

        if (text !== ' ') {
            return;
        }

        const textBefore = EditorCommands.getPrevChars(editor, 2).slice(0, -1);

        for (const rule of refs.current.rules) {
            const { mode = 'text', query } = rule;

            if (query && !query(editor, { ...rule, text })) continue;

            if (editor.selection) {
                const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) ?? [];

                if (mode === 'block' && !isParagraphNode(currentNode)) {
                    continue;
                }

                const formatter = AUTOFORMATTERS[mode];

                const formatResult = formatter?.(editor, {
                    ...(rule as any),
                    text: textBefore,
                });

                if (formatResult) {
                    return;
                }
            }
        }
    }, []);

    return useRegisterExtension({
        id: EXTENSION_ID,
        insertText,
    });
}
