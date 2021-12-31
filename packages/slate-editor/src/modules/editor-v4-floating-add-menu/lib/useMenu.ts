import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent, KeyboardEventHandler, MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Range } from 'slate';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

import type { FloatingAddMenuParameters } from '../types';

const isEnter = isHotkey('enter');
const isArrowUp = isHotkey('up');
const isArrowDown = isHotkey('down');

interface State {
    currentIndex: number;
    open: boolean;
    options: FloatingAddMenuParameters['options'];
    query: string;
}

interface Actions {
    onInputBlur: () => void;
    onInputKeyDown: KeyboardEventHandler;
    onMenuClose: () => void;
    onMenuToggle: (event: MouseEvent) => void;
    onQueryChange: (query: string) => void;
    onSelectItem: (index: number) => void;
}

export default function useMenu(
    allOptions: FloatingAddMenuParameters['options'],
    onToggle: (isShown: boolean) => void,
): [State, Actions] {
    const editor = useSlate();
    const [query, setQuery] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const lastSelectionRef = useRef<Range | null>();
    const options = useMemo(
        () =>
            query
                ? allOptions.filter(({ text }) => text.toLowerCase().includes(query.toLowerCase()))
                : allOptions,
        [allOptions, query],
    );

    function handleIndexChange(nextIndex: number) {
        if (nextIndex < 0) {
            setCurrentIndex(options.length - 1);
        } else {
            setCurrentIndex(nextIndex % options.length);
        }
    }

    function handleOpen() {
        lastSelectionRef.current = editor.selection;
        setOpen(true);
        onToggle(true);
    }

    function handleClose() {
        setOpen(false);
        onToggle(false);
        setCurrentIndex(0);
        setQuery('');
    }

    function restoreEditorSelection() {
        if (open && !ReactEditor.isFocused(editor) && lastSelectionRef.current) {
            // Restore editor focus because the input captured the focus.
            ReactEditor.focus(editor);
            Transforms.select(editor, lastSelectionRef.current);
            lastSelectionRef.current = null;
        }
    }

    function handleMenuClose() {
        restoreEditorSelection();
        handleClose();
    }

    function handleSelectItem(index: number) {
        const option = options[index];
        if (option) {
            // Handle close to restore the editor focus before performing the onClick action.
            handleMenuClose();
            option.onClick(editor);
        }
    }

    function handleMenuToggle(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        // If there's only one component, do not bother with the dropdown at all,
        // just select the first option immediately.
        if (options.length === 1) {
            handleSelectItem(0);
            return;
        }

        if (open) {
            handleMenuClose();
        } else {
            handleOpen();
        }
    }

    function handleInputBlur() {
        // Close the menu but without restoring the selection.
        handleClose();
    }

    function handleInputKeyDown(event: KeyboardEvent): void {
        if (!open) {
            return;
        }

        if (isArrowUp(event.nativeEvent)) {
            event.stopPropagation();
            event.preventDefault();
            handleIndexChange(currentIndex - 1);
        }

        if (isArrowDown(event.nativeEvent)) {
            event.stopPropagation();
            event.preventDefault();
            handleIndexChange(currentIndex + 1);
        }

        if (isEnter(event.nativeEvent)) {
            // Prevent the event propagation to Slate (inserts a new paragraph).
            event.stopPropagation();
            event.preventDefault();
            handleSelectItem(currentIndex);
        }
    }

    useEffect(() => {
        // If options change and currentIndex is out of range, reset the selection.
        if (open && Math.max(0, options.length - 1) < currentIndex) {
            setCurrentIndex(0);
        }
    }, [currentIndex, open, options.length]);

    return [
        {
            currentIndex,
            open,
            options,
            query,
        },
        {
            onInputBlur: handleInputBlur,
            onInputKeyDown: handleInputKeyDown,
            onMenuClose: handleMenuClose,
            onMenuToggle: handleMenuToggle,
            onQueryChange: setQuery,
            onSelectItem: handleSelectItem,
        },
    ];
}
