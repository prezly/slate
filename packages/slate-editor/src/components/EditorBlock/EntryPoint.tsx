import type { ElementNode } from '@prezly/slate-types';
import React, { type MouseEvent } from 'react';
import { Path, Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

interface Props {
    className?: string;
    element: ElementNode;
    position: 'top' | 'bottom';
    title?: string;
}

export function EntryPoint({
    className,
    element,
    position,
    title = 'Click to insert a new paragraph',
}: Props) {
    const editor = useSlateStatic();
    const handleClick = useFunction((event: MouseEvent) => {
        event.stopPropagation();
        const path = ReactEditor.findPath(editor, element);
        Transforms.insertNodes(editor, editor.createDefaultTextBlock(), {
            at: position === 'top' ? path : Path.next(path),
            select: true,
        });

        EventsEditor.dispatchEvent(editor, 'empty-paragraph-inserted', {
            trigger: 'area-around-block',
        });
    });

    return (
        <div
            data-block-entry-point={true}
            className={className}
            contentEditable={false}
            onClick={handleClick}
            role="button"
            title={title}
        >
            {title}
        </div>
    );
}
