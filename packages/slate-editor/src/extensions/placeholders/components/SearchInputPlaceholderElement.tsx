import React, { type KeyboardEvent, useRef, useState } from 'react';
import { Transforms } from 'slate';
import { type RenderElementProps, useSlateStatic } from 'slate-react';

import { EditorBlock } from '#components';
import { mergeRefs, useFunction, useUnmount } from '#lib';

import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

import { type Props as PlaceholderProps, Placeholder } from './Placeholder';
import {
    type Props as SearchInputPlaceholderProps,
    SearchInputPlaceholder,
} from './SearchInputPlaceholder';

export type Props<T> = RenderElementProps &
    Pick<PlaceholderProps, 'icon' | 'title' | 'description' | 'format' | 'onDrop'> & {
        element: PlaceholderNode;
        // SearchInput
        getSuggestions: SearchInputPlaceholderProps<T>['getSuggestions'];
        renderEmpty?: SearchInputPlaceholderProps<T>['renderEmpty'];
        renderSuggestion?: SearchInputPlaceholderProps<T>['renderSuggestion'];
        renderSuggestions?: SearchInputPlaceholderProps<T>['renderSuggestions'];
        inputTitle: SearchInputPlaceholderProps<T>['title'];
        inputDescription: SearchInputPlaceholderProps<T>['description'];
        inputPlaceholder?: SearchInputPlaceholderProps<T>['placeholder'];
        onSelect: SearchInputPlaceholderProps<T>['onSelect'];
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
    onSelect,
}: Props<T>) {
    const editor = useSlateStatic();
    const block = useRef<HTMLDivElement>(null);

    const [progress, setProgress] = useState<number | undefined>(undefined);

    const handleClick = useFunction(() => {
        PlaceholdersManager.activate(element);
    });
    const handleEscape = useFunction((event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
        PlaceholdersManager.deactivate(element);
    });
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
            overflow="visible"
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) =>
                isActive ? (
                    <SearchInputPlaceholder<T>
                        // Customization
                        getSuggestions={getSuggestions}
                        renderEmpty={renderEmpty}
                        renderSuggestion={renderSuggestion}
                        renderSuggestions={renderSuggestions}
                        // Core
                        active={isActive}
                        autoFocus
                        format={format}
                        title={inputTitle}
                        description={inputDescription}
                        placeholder={inputPlaceholder}
                        // Actions
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
                        selected={isSelected}
                        progress={progress ?? isLoading}
                        // Callbacks
                        onClick={isLoading ? undefined : handleClick}
                        onRemove={handleRemove}
                    />
                )
            }
            rounded
            void
        />
    );
}
