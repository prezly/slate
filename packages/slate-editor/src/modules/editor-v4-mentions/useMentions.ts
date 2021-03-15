import isHotkey from 'is-hotkey';
import { KeyboardEvent, useCallback, useMemo, useState } from 'react';
import { Editor, Range, Transforms } from 'slate';

import { getWordAfterTrigger, insertMention, isPointAtWordEnd } from './lib';
import { MentionElementType, Option } from './types';

interface Parameters<T extends string, V> {
    createMentionElement: (option: Option<V>) => MentionElementType<T>;
    options: Option<V>[];
    trigger: string;
}

interface Mentions<V> {
    index: number;
    onAdd: (editor: Editor, option: Option<V>) => void;
    onChange: (editor: Editor) => void;
    onKeyDown: (event: KeyboardEvent, editor: Editor) => void;
    options: Option<V>[];
    query: string;
    target: Range | null;
}

const useMentions = <T extends string, V>({
    createMentionElement,
    options,
    trigger,
}: Parameters<T, V>): Mentions<V> => {
    const [index, setIndex] = useState<number>(0);
    const [query, setQuery] = useState<string>('');
    const [target, setTarget] = useState<Range | null>(null);
    const filteredOptions = useMemo(
        () => options.filter(({ label }) => label.search(new RegExp(query, 'i')) !== -1),
        [query, options],
    );

    const onAdd = useCallback(
        (editor: Editor, option: Option<V>) => {
            if (target) {
                Transforms.select(editor, target);
                const mentionElement = createMentionElement(option);
                insertMention(editor, mentionElement);
                setTarget(null);
            }
        },
        [createMentionElement, target],
    );

    const onChange = useCallback(
        (editor: Editor) => {
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
        (event: KeyboardEvent, editor: Editor) => {
            if (!target) {
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
        [index, filteredOptions, onAdd, target],
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
};

export default useMentions;
