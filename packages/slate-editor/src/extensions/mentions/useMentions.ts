import { stubTrue } from '@technically/lodash';
import { isHotkey } from 'is-hotkey';
import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { getWordAfterTrigger, insertMention, isPointAtWordEnd } from './lib';
import type { MentionElementType, Option } from './types';

interface Parameters<V> {
    createMentionElement: (option: Option<V>) => MentionElementType;
    isEnabled?: (target: Range | null) => boolean;
    options: Option<V>[];
    trigger: string;
}

export interface Mentions<V> {
    index: number;
    onAdd: (option: Option<V>) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    options: Option<V>[];
    query: string;
    target: Range | null;
}

export function useMentions<V>({
    createMentionElement,
    isEnabled = stubTrue,
    options,
    trigger,
}: Parameters<V>): Mentions<V> {
    const editor = useSlate(); // `useSlate()` is to react to the editor changes

    const [index, setIndex] = useState<number>(0);
    const [query, setQuery] = useState<string>('');
    const [target, setTarget] = useState<Range | null>(null);

    const filteredOptions = useMemo(() => {
        if (!isEnabled(target)) return [];
        return options.filter(({ label }) => label.search(new RegExp(query, 'i')) !== -1); // FIXME: RegExp(query, i)
    }, [isEnabled, query, options, target]);

    const onAdd = useCallback(
        (option: Option<V>) => {
            if (target) {
                Transforms.select(editor, target);
                const mentionElement = createMentionElement(option);
                insertMention(editor, mentionElement);
                setTarget(null);
            }
        },
        [editor, createMentionElement, target],
    );

    useEffect(() => {
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
    }, [editor.children, editor.selection]);

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
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
                onAdd(filteredOptions[index]);
            }
        },
        [index, isEnabled, filteredOptions, onAdd, target],
    );

    return {
        index,
        onAdd,
        onKeyDown,
        options: filteredOptions,
        query,
        target,
    };
}
