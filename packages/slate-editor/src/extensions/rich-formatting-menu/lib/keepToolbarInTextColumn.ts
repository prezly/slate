import type { ModifierArguments } from '@popperjs/core';
import { preventOverflow } from '@popperjs/core';
import type { Modifier } from 'react-popper';

interface Options {
    editorElement: HTMLElement | null;
    availableWidth: number;
}

export function keepToolbarInTextColumn(options: Options): Modifier<string, Options> {
    return {
        name: 'prezly:keepToolbarInTextColumn',
        enabled: true,
        phase: 'main',
        requiresIfExists: ['offset'],
        options,
        fn: alignToTextBoundary,
    };
}

function alignToTextBoundary({
    name,
    state,
    instance,
    options,
}: ModifierArguments<{ availableWidth: number; editorElement: HTMLElement | null }>) {
    const { availableWidth, editorElement } = options;

    if (!editorElement || !availableWidth) {
        return;
    }

    const rect = editorElement.getBoundingClientRect();
    const rightPadding = Math.max(0, (rect.width - availableWidth) / 2);

    return preventOverflow.fn({
        name,
        state,
        instance,
        options: {
            boundary: editorElement,
            padding: {
                right: rightPadding,
            },
        },
    });
}
