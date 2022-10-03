import type { ReactElement, MouseEvent } from 'react';
import React, { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Transforms } from 'slate';
import { type RenderElementProps, useSelected, useSlateStatic } from 'slate-react';

import type { SearchInput } from '#components';
import { EditorBlock } from '#components';
import { mergeRefs, useFunction, useUnmount } from '#lib';

import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

import { type Props as PlaceholderProps, Placeholder } from './Placeholder';
import { SearchInputPlaceholder } from './SearchInputPlaceholder';

export type Props<T> = RenderElementProps &
    Pick<PlaceholderProps, 'icon' | 'title' | 'description' | 'format' | 'onDrop'> &
    Pick<SearchInputPlaceholder.Props<T>, 'getSuggestions' | 'onSelect'> & {
        element: PlaceholderNode;
        // SearchInput
        renderEmpty?: (
            props: { placeholder: PlaceholderNode } & SearchInput.Props.Empty,
        ) => ReactElement | null;
        renderSuggestion?: (
            props: { placeholder: PlaceholderNode } & SearchInput.Props.Option<T>,
        ) => ReactElement | null;
        renderSuggestions?: (
            props: { placeholder: PlaceholderNode } & SearchInput.Props.Suggestions<T>,
        ) => ReactElement | null;

        inputTitle: SearchInputPlaceholder.Props<T>['title'];
        inputDescription: SearchInputPlaceholder.Props<T>['description'];
        inputPlaceholder?: SearchInputPlaceholder.Props<T>['placeholder'];
    };

export function SearchInputPlaceholderElement<T>({
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
    getSuggestions,
    renderEmpty,
    renderSuggestion,
    renderSuggestions,
    inputTitle,
    inputDescription,
    inputPlaceholder,
    // Callbacks
    onDrop,
    onSelect,
}: Props<T>) {
    const editor = useSlateStatic();
    const isSelected = useSelected();
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
    const handleDragOver = useFunction(() => {
        setDragOver(true);
        if (isActive && onDrop) {
            PlaceholdersManager.deactivate(element);
        }
    });
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

    useEffect(() => {
        if (!isSelected) {
            PlaceholdersManager.deactivate(element);
        }
    }, [isSelected]);

    return (
        <EditorBlock
            {...attributes}
            ref={mergeRefs(block, attributes.ref)}
            element={element}
            overflow="visible"
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) =>
                isActive ? (
                    <SearchInputPlaceholder<T>
                        // Customization
                        getSuggestions={getSuggestions}
                        renderEmpty={
                            renderEmpty &&
                            ((props) => renderEmpty({ ...props, placeholder: element }))
                        }
                        renderSuggestion={
                            renderSuggestion &&
                            ((props) => renderSuggestion({ ...props, placeholder: element }))
                        }
                        renderSuggestions={
                            renderSuggestions &&
                            ((props) => renderSuggestions({ ...props, placeholder: element }))
                        }
                        // Core
                        active
                        autoFocus
                        format={format}
                        title={inputTitle}
                        description={inputDescription}
                        placeholder={inputPlaceholder}
                        // Actions
                        onDragOver={handleDragOver}
                        onEsc={handleEscape}
                        onRemove={handleRemove}
                        onSelect={onSelect}
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
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={onDrop}
                        onMouseOver={handleMouseOver}
                        onRemove={handleRemove}
                    />
                )
            }
            rounded
            void
        />
    );
}
