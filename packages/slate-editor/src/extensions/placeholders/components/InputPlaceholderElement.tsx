import React, { type MouseEvent, useRef, useState } from 'react';
import { Transforms } from 'slate';
import { type RenderElementProps, useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { mergeRefs, useFunction } from '#lib';

import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

import { type Props as InputPlaceholderProps, InputPlaceholder } from './InputPlaceholder';
import { type Props as PlaceholderProps, Placeholder } from './Placeholder';

export type Props = RenderElementProps &
    Pick<PlaceholderProps, 'icon' | 'title' | 'description' | 'format' | 'onDrop'> & {
        element: PlaceholderNode;
        inputTitle: InputPlaceholderProps['title'];
        inputDescription: InputPlaceholderProps['description'];
        inputAction: string;
        inputPlaceholder: string;
        onSubmit: InputPlaceholderProps['onSubmit'];
    };

export function InputPlaceholderElement({
    // Slate Props
    attributes,
    children,
    element,
    // Core
    format,
    icon,
    title,
    description,
    // Input
    inputTitle,
    inputDescription,
    inputAction,
    inputPlaceholder,
    // Callbacks
    onDrop,
    onSubmit,
}: Props) {
    const editor = useSlateStatic();
    const block = useRef<HTMLDivElement>(null);

    const [progress, setProgress] = useState<number | undefined>(undefined);
    const [dragOver, setDragOver] = useState(false);

    const handleClick = useFunction(() => {
        PlaceholdersManager.activate(element);
    });
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

    const { isActive, isLoading } = usePlaceholderManagement(
        element.type as PlaceholderNode.Type,
        element.uuid,
        {
            onProgress: (p) => setProgress(p),
        },
    );

    return (
        <EditorBlock
            {...attributes}
            ref={mergeRefs(block, attributes.ref)}
            element={element}
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) =>
                isActive ? (
                    <InputPlaceholder
                        autoFocus
                        title={inputTitle}
                        description={inputDescription}
                        placeholder={inputPlaceholder}
                        action={inputAction}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <Placeholder
                        // Core
                        format={format}
                        icon={icon}
                        title={title}
                        description={description}
                        // Variations
                        dragOver={onDrop ? dragOver : false}
                        selected={isSelected}
                        progress={progress ?? isLoading}
                        // Callbacks
                        onClick={isLoading ? undefined : handleClick}
                        onRemove={handleRemove}
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
