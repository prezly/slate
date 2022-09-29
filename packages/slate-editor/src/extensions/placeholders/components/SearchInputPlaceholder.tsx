import classNames from 'classnames';
import { isHotkey } from 'is-hotkey';
import type { FunctionComponent, KeyboardEvent, MouseEvent, ReactNode, ReactElement } from 'react';
import React, { useCallback, useRef, useState } from 'react';

import { SearchInput } from '#components';
import { useFunction } from '#lib';

import { type Props as BaseProps, Frame } from './Frame';
import styles from './InputPlaceholder.module.scss';
import type { ContentRenderProps } from './Placeholder';

const isEsc = isHotkey('esc');

export function SearchInputPlaceholder<T>({
    className,
    title,
    description,
    dragOver,
    format = 'card',
    progress,
    selected = false,
    // Input properties
    getSuggestions,
    renderEmpty,
    renderSuggestion,
    renderSuggestions,
    autoFocus = false,
    disabled = false,
    initialQuery = '',
    placeholder,
    // Input callbacks
    onEsc,
    onSelect,
    ...attributes
}: SearchInputPlaceholder.Props<T>) {
    const isLoading = typeof progress === 'number' || progress === true;
    const progressNumber = typeof progress === 'number' ? progress : undefined;
    const [pressed, setPressed] = useState(false);
    const [query, setQuery] = useState(initialQuery ?? '');
    const input = useRef<HTMLInputElement>(null);

    function renderContent(
        content: ReactNode | FunctionComponent<ContentRenderProps>,
        isSelected: boolean,
    ): ReactElement | null {
        if (typeof content === 'function') {
            return content({
                isDragOver: Boolean(dragOver),
                isLoading,
                isSelected,
                progress: progressNumber,
            });
        }
        return <>{content}</>;
    }

    function handleSelect(suggestion: SearchInput.Suggestion<T>) {
        if (input.current?.validity.valid) {
            onSelect?.(suggestion.value);
        }
    }

    const handleKeyDown = useFunction((event: KeyboardEvent) => {
        if (onEsc && isEsc(event)) onEsc(event);
    });

    const handleMouseDown = useCallback(() => setPressed(true), [setPressed]);
    const handleMouseUp = useCallback(() => setPressed(false), [setPressed]);
    const handleMouseOver = useCallback(
        (event: MouseEvent) => {
            if (event.buttons === 0) {
                setPressed(false);
            }
        },
        [setPressed],
    );

    return (
        <Frame
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOver={handleMouseOver}
            onClick={(event) => {
                stopPropagation(event);
                input.current?.focus();
            }}
            onKeyDown={stopPropagation}
            onKeyUp={stopPropagation}
            {...attributes}
            className={classNames(className, styles.InputPlaceholder, {
                [styles.pressed]: pressed,
            })}
            dragOver={dragOver}
            format={format}
            progress={progress}
            selected={selected}
        >
            <div className={styles.Title}>{renderContent(title, selected)}</div>
            <div className={styles.Description}>{renderContent(description, selected)}</div>
            <SearchInput<T>
                autoFocus={autoFocus}
                className={styles.Input}
                disabled={disabled}
                getSuggestions={getSuggestions}
                renderEmpty={renderEmpty}
                renderSuggestion={renderSuggestion}
                renderSuggestions={renderSuggestions}
                icon="search"
                inputRef={input}
                onChange={setQuery}
                onClear={() => setQuery('')}
                onKeyDown={handleKeyDown}
                onSelect={handleSelect}
                placeholder={placeholder}
                required
                query={query}
            />
        </Frame>
    );
}

export namespace SearchInputPlaceholder {
    export interface Props<T>
        extends Omit<BaseProps, 'title' | 'onSubmit' | 'onSelect' | 'pattern'> {
        getSuggestions: SearchInput.Props<T>['getSuggestions'];
        renderEmpty?: SearchInput.Props<T>['renderEmpty'];
        renderSuggestion?: SearchInput.Props<T>['renderSuggestion'];
        renderSuggestions?: SearchInput.Props<T>['renderSuggestions'];

        // Base
        title: ReactNode | FunctionComponent<ContentRenderProps>;
        description: ReactNode | FunctionComponent<ContentRenderProps>;
        // SearchInput properties
        disabled?: boolean;
        autoFocus?: boolean;
        initialQuery?: string;
        placeholder?: string;
        onEsc?: (event: KeyboardEvent) => void;
        onSelect?: (value: T) => void;
    }
}

function stopPropagation(event: KeyboardEvent | MouseEvent) {
    event.stopPropagation();
}
