import React, { useState } from 'react';
import { Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { useFunction } from '#lib';

import type { Props as BaseProps } from './Placeholder';
import { Placeholder } from './Placeholder';

export type Props = RenderElementProps &
    Pick<BaseProps, 'icon' | 'title' | 'description' | 'onClick'> & {
        dropZone?: boolean;
    };

export function PlaceholderElement({
    // Slate Props
    attributes,
    children,
    element,
    // Core
    icon,
    title,
    description,
    // Variations
    dropZone = false,
    // Callbacks
    onClick,
}: Props) {
    const editor = useSlateStatic();

    const [dragOver, setDragOver] = useState(false);

    const handleDragOver = useFunction(() => setDragOver(true));
    const handleDragLeave = useFunction(() => setDragOver(false));
    const handleRemove = useFunction(() => {
        Transforms.removeNodes(editor, { at: [], match: (node) => node === element });
    });

    return (
        <EditorBlock
            {...attributes}
            element={element}
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) => (
                <Placeholder
                    // Core
                    icon={icon}
                    title={title}
                    description={description}
                    // Variations
                    dragOver={dropZone ? dragOver : false}
                    selected={isSelected}
                    // Callbacks
                    onClick={onClick}
                    onRemove={handleRemove}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                />
            )}
            rounded
            void
        />
    );
}
