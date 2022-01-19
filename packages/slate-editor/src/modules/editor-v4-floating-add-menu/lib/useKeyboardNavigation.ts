import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent, KeyboardEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useLatest } from '#lib';

type ResetFn = () => void;

const isEnter = isHotkey('enter');
const isArrowUp = isHotkey('up');
const isArrowDown = isHotkey('down');

function clampIndex(index: number, optionsLength: number) {
    return (optionsLength + index) % optionsLength;
}

export function useKeyboardNavigation<Option>(
    options: Option[],
    onSelect: (option: Option) => void,
): [Option, KeyboardEventHandler, ResetFn] {
    const params = useLatest({ onSelect, options });
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        // If options change and currentIndex is out of range, reset the selection.
        if (currentIndex > Math.max(0, options.length - 1)) {
            setCurrentIndex(0);
        }
    }, [currentIndex, options.length]);

    const handleKeyDown = useCallback(
        function (event: KeyboardEvent): void {
            const { options, onSelect } = params.current;
            if (isArrowUp(event.nativeEvent)) {
                event.stopPropagation();
                event.preventDefault();
                setCurrentIndex((currentIndex) => clampIndex(currentIndex - 1, options.length));
            }

            if (isArrowDown(event.nativeEvent)) {
                event.stopPropagation();
                event.preventDefault();
                setCurrentIndex((currentIndex) => clampIndex(currentIndex + 1, options.length));
            }

            if (isEnter(event.nativeEvent)) {
                // Prevent the event propagation to Slate (inserts a new paragraph).
                event.stopPropagation();
                event.preventDefault();
                onSelect(options[currentIndex]);
            }
        },
        [params],
    );

    const resetSelectedOption = useCallback(
        function () {
            setCurrentIndex(0);
        },
        [setCurrentIndex],
    );

    return [options[currentIndex], handleKeyDown, resetSelectedOption];
}
