import React, { type MouseEvent, useState } from 'react';
import { Transforms } from 'slate';
import { type RenderElementProps, useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { useFunction } from '#lib';

import type { PlaceholderNode } from '../PlaceholderNode';
import { usePlaceholderManagement } from '../PlaceholdersManager';

import { type Props as BaseProps, Placeholder } from './Placeholder';

export type Props = RenderElementProps &
    Pick<BaseProps, 'icon' | 'title' | 'description' | 'onClick' | 'onDrop'> & {
        element: PlaceholderNode;
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
    onDrop,
}: Props) {
    const editor = useSlateStatic();

    const [progress, setProgress] = useState<number | undefined>(undefined);
    const [dragOver, setDragOver] = useState(false);

    const handleMouseOver = useFunction((event: MouseEvent) => {
        if (!event.buttons) {
            setDragOver(false);
        }
    });
    const handleDragOver = useFunction(() => setDragOver(true));
    const handleDragLeave = useFunction(() => setDragOver(false));
    const handleRemove = useFunction(() => {
        Transforms.removeNodes(editor, { at: [], match: (node) => node === element });
    });

    const { isLoading } = usePlaceholderManagement(
        element.type as PlaceholderNode.Type,
        element.uuid,
        {
            onProgress: (p) => setProgress(p),
        },
    );

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
                    progress={progress ?? isLoading}
                    // Callbacks
                    onClick={isLoading ? undefined : onClick}
                    onRemove={handleRemove}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={onDrop}
                    onMouseOver={handleMouseOver}
                />
            )}
            rounded
            void
        />
    );
}
