import type { Rect } from '@popperjs/core';
import type { Modifier } from 'react-popper';

import type { PopperOptionsContextType } from '#modules/popper-options-context';

import styles from './Menu.module.scss';

/**
 * Elements in slate are surrounded by an outline,
 * which is not included in the element's bounding box.
 */
const TETHER_OFFSET_OUTLINE_SIZE = 6;

/**
 * Since slate element has outline on top and bottom,
 * we need to multiply the outline size by 2 to get the total offset.
 */
const SLATE_ELEMENT_TOTAL_OFFSET = 2 * TETHER_OFFSET_OUTLINE_SIZE;

export function getMenuPopperModifiers(
    popperOptions: PopperOptionsContextType,
): Modifier<string>[] {
    const { modifiers } = popperOptions;

    return [
        {
            name: 'offset',
            enabled: true,
            options: {
                offset: ({
                    popper,
                    reference,
                }: {
                    popper: Rect;
                    reference: Rect;
                }): [number, number] => {
                    const referenceHeight = getSlateElementHeight(reference.height);
                    const popperTallerThanReference = popper.height - referenceHeight;
                    const offset = popperTallerThanReference / 2;

                    return [offset, 16];
                },
            },
        },
        {
            name: 'flip',
            enabled: true,
            options: {
                // The order of these properties is important! The first one that has enough space to fit the popup will be used as fallback
                // We prioritise flipping on Y axis (as this is the most common reason for overflow), then flipping X axis if needed.
                // `right-start` is there as a fallback for cases when non-standard placement option is used.
                fallbackPlacements: ['right', 'left'],
            },
        },
        {
            name: 'arrow',
            enabled: true,
            options: {
                padding: 19,
            },
        },
        {
            name: 'preventOverflow',
            enabled: true,
            options: {
                altAxis: true,
                mainAxis: true,
                rootBoundary: 'document',
                padding: {
                    top: 12,
                    right: 12,
                },
                // Make the menu snap to the bottom of the reference element
                // if popper.height < reference.height
                tetherOffset: ({ popper, reference }: { popper: Rect; reference: Rect }) => {
                    const referenceHeight = getSlateElementHeight(reference.height);
                    let offset = 0;

                    if (popper.height < referenceHeight) {
                        offset = referenceHeight - (referenceHeight - popper.height);
                    } else {
                        offset = popper.height - (popper.height - referenceHeight);
                    }

                    return offset - SLATE_ELEMENT_TOTAL_OFFSET;
                },
                ...modifiers?.preventOverflow,
            },
        },
        {
            name: 'prezly:autoHideArrow',
            enabled: true,
            phase: 'write',
            fn({ state }) {
                const { arrow } = state.elements;

                if (arrow) {
                    if (state.modifiersData.preventOverflow?.x) {
                        arrow.classList.add(styles.hidden);
                    } else {
                        arrow.classList.remove(styles.hidden);
                    }
                }
            },
        },
    ];
}

function getSlateElementHeight(height: number) {
    return height + SLATE_ELEMENT_TOTAL_OFFSET;
}
