import type { ArrowModifier } from '@popperjs/core/lib/modifiers/arrow';
import type { FlipModifier } from '@popperjs/core/lib/modifiers/flip';
import type { OffsetModifier } from '@popperjs/core/lib/modifiers/offset';
import type { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow';
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
                offset: ({ popper, reference }) => {
                    const referenceHeight = getSlateElementHeight(reference.height);
                    const popperTallerThanReference = popper.height - referenceHeight;
                    const offset = popperTallerThanReference / 2;

                    /*
                     * If offset is 0 then the menu wil be centered (in the middle) on the reference element.
                     * For example if the reference element is 150px tall and the menu is 100px tall,
                     * then the menu will have 25px offset (padding) on top and bottom.
                     * If the menu is 150px tall, then the reference element will have so to say 25px offset (padding) on top and bottom.
                     * So when the offset is 0 the menu element will be placed in the middle of the reference element despite what is taller.
                     * However, we need to snap the menu to the top of the reference element.
                     *
                     * If the menu is taller than the reference element, then we need to "push down" the menu by 25px and `offset` will be positive.
                     * If the menu is shorter than the reference element, then we need to "pull up" the menu by 25px and `offset` will be negative.
                     */
                    return [offset, 16];
                },
            },
        } satisfies Partial<OffsetModifier>,
        {
            name: 'flip',
            enabled: Boolean(popperOptions.autoPlacement),
            options: {
                // The order of these properties is important! The first one that has enough space to fit the popup will be used as fallback
                // We prioritize flipping on Y axis (as this is the most common reason for overflow), then flipping X axis if needed.
                fallbackPlacements: ['right', 'left'],
            },
        } satisfies Partial<FlipModifier>,
        {
            name: 'arrow',
            enabled: true,
            options: {
                padding: 19,
            },
        } satisfies Partial<ArrowModifier>,
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
                tetherOffset: ({ popper, reference }) => {
                    const referenceHeight = getSlateElementHeight(reference.height);
                    const offset =
                        popper.height > referenceHeight ? referenceHeight : popper.height;

                    // Make the menu snap to the bottom of the reference element
                    return offset - SLATE_ELEMENT_TOTAL_OFFSET;
                },
                ...modifiers?.preventOverflow,
            },
        } satisfies Partial<PreventOverflowModifier>,
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
