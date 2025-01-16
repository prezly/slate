import type { RenderElementProps, SlateEditor } from '@udecode/plate';
import { useEditorRef } from '@udecode/plate/react';
import type { ReactNode } from 'react';
import React, { type MouseEvent, useState } from 'react';

import { EditorBlock } from '#components';
import { useFunction } from '#lib';

import type { PlaceholderNode } from '../PlaceholderNode';
import { usePlaceholderManagement } from '../PlaceholdersManager';
import type { RemovableFlagConfig } from '../types';

import { type Props as BaseProps, Placeholder } from './Placeholder';

export type Props = RenderElementProps &
    Pick<BaseProps, 'icon' | 'title' | 'description' | 'format' | 'onClick' | 'onDrop'> & {
        element: PlaceholderNode;
        overflow?: 'visible' | 'hidden' | 'auto';
        removable: RemovableFlagConfig;
        renderFrame?: () => ReactNode;
    };

export function PlaceholderElement({
    // Slate Props
    attributes,
    children,
    element,
    // Core
    format,
    icon,
    title,
    description,
    overflow,
    removable,
    renderFrame,
    // Callbacks
    onClick,
    onDrop,
}: Props) {
    const editor = useEditorRef();

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
        editor.tf.removeNodes({ at: [], match: (node) => node === element });
    });

    const { isActive, isLoading } = usePlaceholderManagement(
        element.type as PlaceholderNode.Type,
        element.uuid,
        {
            onProgress: setProgress,
        },
    );

    const isRemovable =
        typeof removable === 'boolean' ? removable : checkRemovable(editor, element, removable);

    return (
        <EditorBlock
            {...attributes}
            element={element}
            overflow={overflow}
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) =>
                renderFrame ? (
                    renderFrame()
                ) : (
                    <Placeholder
                        // Core
                        active={isActive}
                        format={format}
                        icon={icon}
                        title={title}
                        description={description}
                        // Variations
                        dragOver={onDrop ? dragOver : false}
                        dropZone={Boolean(onDrop)}
                        selected={isSelected}
                        progress={progress ?? isLoading}
                        // Callbacks
                        onClick={isLoading ? undefined : onClick}
                        onRemove={isRemovable ? handleRemove : undefined}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={onDrop}
                        onMouseOver={handleMouseOver}
                    />
                )
            }
            rounded
            void
        />
    );
}

function checkRemovable(
    editor: SlateEditor,
    element: PlaceholderNode,
    removable: Exclude<RemovableFlagConfig, boolean>,
) {
    try {
        const path = editor.api.findPath(element);
        if (path) {
            return removable(element, path);
        }

        return false;
    } catch {
        return false;
    }
}
