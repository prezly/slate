import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent, KeyboardEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useLatest } from '#lib';

type ResetFn = () => void;

const isTab = isHotkey('tab');
const isEnter = isHotkey('enter');
const isArrowUp = isHotkey('up');
const isArrowDown = isHotkey('down');

function clampIndex(index: number, optionsLength: number) {
    return (optionsLength + index) % optionsLength;
}

function verifyIndex(currentIndex: number, options: boolean[]): number {
    if (options.filter(Boolean).length === 0) {
        return currentIndex;
    }
    let changedIndex = currentIndex;
    while (!options[changedIndex]) {
        changedIndex = clampIndex(changedIndex + 1, options.length);
    }
    return changedIndex;
}

function incrementIndex(currentIndex: number, options: boolean[]): number {
    if (options.filter(Boolean).length === 0) {
        return currentIndex;
    }
    let changedIndex = currentIndex;
    do {
        changedIndex = clampIndex(changedIndex + 1, options.length);
    } while (!options[changedIndex]);
    return changedIndex;
}

function decrementIndex(currentIndex: number, options: boolean[]): number {
    if (options.filter(Boolean).length === 0) {
        return currentIndex;
    }
    let changedIndex = currentIndex;
    do {
        changedIndex = clampIndex(changedIndex - 1, options.length);
    } while (!options[changedIndex]);
    return changedIndex;
}

export function useKeyboardNavigation<Option>(
    options: Option[],
    onSelect: (option: Option) => void,
    isSelectable: (option: Option) => boolean = alwaysTrue,
): [Option | undefined, KeyboardEventHandler, ResetFn] {
    const params = useLatest({ onSelect, options, isSelectable });
    const [currentIndex, setCurrentIndex] = useState<number>(() =>
        verifyIndex(0, options.map(isSelectable)),
    );

    useEffect(() => {
        // If options change and currentIndex is out of range, reset the selection.
        if (currentIndex > Math.max(0, options.length - 1)) {
            setCurrentIndex(0);
        }
    }, [currentIndex, options.length]);

    useEffect(() => {
        const { options, isSelectable } = params.current;
        const changedIndex = verifyIndex(currentIndex, options.map(isSelectable));
        if (changedIndex !== currentIndex) {
            setCurrentIndex(changedIndex);
        }
    }, [currentIndex, options]);

    const handleKeyDown = useCallback(
        function (event: KeyboardEvent): void {
            const { options, isSelectable, onSelect } = params.current;
            if (isArrowUp(event)) {
                event.stopPropagation();
                event.preventDefault();
                setCurrentIndex((currentIndex) =>
                    decrementIndex(currentIndex, options.map(isSelectable)),
                );
            }

            if (isArrowDown(event)) {
                event.stopPropagation();
                event.preventDefault();
                setCurrentIndex((currentIndex) =>
                    incrementIndex(currentIndex, options.map(isSelectable)),
                );
            }

            if (isEnter(event) || isTab(event)) {
                // Prevent the event propagation to Slate (inserts a new paragraph).
                event.stopPropagation();
                event.preventDefault();
                onSelect(options[currentIndex]);
            }
        },
        [params, currentIndex],
    );

    const resetSelectedOption = useCallback(
        function () {
            const { options, isSelectable } = params.current;
            setCurrentIndex(verifyIndex(0, options.map(isSelectable)));
        },
        [setCurrentIndex],
    );

    return [options[currentIndex], handleKeyDown, resetSelectedOption];
}

function alwaysTrue() {
    return true;
}
