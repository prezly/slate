import React, { type KeyboardEvent, type MouseEvent, useRef, useState } from 'react';
import { Transforms } from 'slate';
import { type RenderElementProps, useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { mergeRefs, useFunction, useUnmount } from '#lib';

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
        inputPattern?: InputPlaceholderProps['pattern'];
        inputPlaceholder?: InputPlaceholderProps['placeholder'];
        inputType?: InputPlaceholderProps['type'];
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
    inputPattern,
    inputPlaceholder,
    inputType,
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
    const handleEscape = useFunction((event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
        PlaceholdersManager.deactivate(element);
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

    const { isActive, isLoading } = usePlaceholderManagement(element.type, element.uuid, {
        onProgress: (p) => setProgress(p),
    });

    useUnmount(() => {
        PlaceholdersManager.deactivate(element);
    });

    return (
        <EditorBlock
            {...attributes}
            ref={mergeRefs(block, attributes.ref)}
            element={element}
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) =>
                isActive ? (
                    <InputPlaceholder
                        active={isActive}
                        autoFocus
                        format={format}
                        title={inputTitle}
                        description={inputDescription}
                        pattern={inputPattern}
                        placeholder={inputPlaceholder}
                        type={inputType}
                        // Actions
                        action={inputAction}
                        onEsc={handleEscape}
                        onRemove={handleRemove}
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
