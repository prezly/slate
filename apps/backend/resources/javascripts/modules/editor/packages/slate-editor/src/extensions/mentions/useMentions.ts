import { stubTrue } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'slate';

import { getWordAfterTrigger, insertMention, isPointAtWordEnd } from './lib';
import type { MentionElementType, Option } from './types';

interface Parameters<V> {
    createMentionElement: (option: Option<V>) => MentionElementType;
    isEnabled?: (target: Range | null) => boolean;
    moveCursorAfterInsert?: boolean;
    options: Option<V>[];
    trigger: string;
}

export interface Mentions<V> {
    index: number;
    onAdd: (editor: SlateEditor, option: Option<V>) => void;
    onChange: (editor: SlateEditor) => void;
    onKeyDown: (event: KeyboardEvent, editor: SlateEditor) => void;
    options: Option<V>[];
    query: string;
    target: Range | null;
}

export function useMentions<V>({
    createMentionElement,
    isEnabled = stubTrue,
    moveCursorAfterInsert = true,
    options,
    trigger,
}: Parameters<V>): Mentions<V> {
    const [index, setIndex] = useState<number>(0);
    const [query, setQuery] = useState<string>('');
    const [target, setTarget] = useState<Range | null>(null);
    const filteredOptions = useMemo(() => {
        if (!isEnabled(target)) return [];
        return options.filter(({ label }) => label.search(new RegExp(query, 'i')) !== -1);
    }, [isEnabled, query, options, target]);

    const onAdd = useCallback(
        (editor: SlateEditor, option: Option<V>) => {
            if (target) {
                editor.select(target);
                const mentionElement = createMentionElement(option);
                insertMention(editor, mentionElement, moveCursorAfterInsert);
                setTarget(null);
            }
        },
        [createMentionElement, target],
    );

    const onChange = useCallback(
        (editor: SlateEditor) => {
            const { selection } = editor;

            if (selection && Range.isCollapsed(selection)) {
                const at = Range.start(selection);
                const word = getWordAfterTrigger(editor, { at, trigger });

                if (word && isPointAtWordEnd(editor, { at })) {
                    setTarget(word.range);
                    setQuery(word.text);
                    setIndex(0);
                    return;
                }
            }

            setTarget(null);
        },
        [setIndex, setQuery, trigger],
    );

    const onKeyDown = useCallback(
        (event: KeyboardEvent, editor: SlateEditor) => {
            if (!target || !isEnabled(target)) {
                return;
            }

            if (isHotkey('ArrowDown', event.nativeEvent)) {
                event.preventDefault();
                setIndex(Math.min(index + 1, filteredOptions.length - 1));
            }

            if (isHotkey('ArrowUp', event.nativeEvent)) {
                event.preventDefault();
                setIndex(Math.max(index - 1, 0));
            }

            if (isHotkey('Escape', event.nativeEvent)) {
                event.preventDefault();
                setTarget(null);
            }

            if (
                (isHotkey('Tab', event.nativeEvent) || isHotkey('Enter', event.nativeEvent)) &&
                filteredOptions[index]
            ) {
                event.preventDefault();
                onAdd(editor, filteredOptions[index]);
            }
        },
        [index, isEnabled, filteredOptions, onAdd, target],
    );

    return {
        index,
        onAdd,
        onChange,
        onKeyDown,
        options: filteredOptions,
        query,
        target,
    };
}
