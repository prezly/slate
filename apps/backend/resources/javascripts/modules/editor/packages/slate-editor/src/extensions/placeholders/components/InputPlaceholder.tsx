import classNames from 'classnames';
import { isHotkey } from 'is-hotkey';
import type { FunctionComponent, KeyboardEvent, MouseEvent, ReactNode, FormEvent } from 'react';
import React, { useCallback, useRef, useState } from 'react';

import { Input } from '#components';
import { useFunction } from '#lib';

import { type Props as BaseProps, Frame } from './Frame';
import styles from './InputPlaceholder.module.scss';
import type { ContentRenderProps } from './Placeholder';

export interface Props extends Omit<BaseProps, 'title' | 'onSubmit'> {
    children?: ReactNode;
    title: ReactNode | FunctionComponent<ContentRenderProps>;
    description: ReactNode | FunctionComponent<ContentRenderProps>;
    // Input properties
    action: string;
    disabled?: boolean;
    autoFocus?: boolean;
    initialValue?: string;
    type?: string;
    pattern?: string;
    placeholder?: string;
    onEsc?: (event: KeyboardEvent) => void;
    onSubmit?: (value: string) => void;
}

const isEsc = isHotkey('esc');

export function InputPlaceholder({
    children,
    className,
    action,
    title,
    description,
    dragOver,
    dropZone,
    format = 'card',
    progress,
    selected = false,
    // Input properties
    autoFocus = false,
    disabled = false,
    initialValue = '',
    pattern,
    placeholder,
    type,
    // Input callbacks
    onEsc,
    onSubmit,
    ...attributes
}: Props) {
    const isLoading = typeof progress === 'number' || progress === true;
    const progressNumber = typeof progress === 'number' ? progress : undefined;
    const [pressed, setPressed] = useState(false);
    const [value, setValue] = useState(initialValue ?? '');
    const input = useRef<HTMLInputElement>(null);

    function renderContent(
        content: ReactNode | FunctionComponent<ContentRenderProps>,
        isSelected: boolean,
    ): ReactNode {
        if (typeof content === 'function') {
            return content({
                isDragOver: Boolean(dragOver),
                isLoading,
                isSelected,
                progress: progressNumber,
            });
        }
        return content;
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (input.current?.validity.valid) {
            onSubmit?.(value);
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
            active
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
            dropZone={dropZone}
            format={format}
            progress={progress}
            selected={selected}
        >
            <div className={styles.Title}>{renderContent(title, selected)}</div>
            <div className={styles.Description}>{renderContent(description, selected)}</div>
            <form onSubmit={handleSubmit}>
                <Input
                    autoFocus={autoFocus}
                    button={{ text: action, type: 'submit' }}
                    className={styles.Input}
                    disabled={disabled}
                    icon="link"
                    onChange={setValue}
                    onKeyDown={handleKeyDown}
                    pattern={pattern}
                    placeholder={placeholder}
                    ref={input}
                    required
                    type={type}
                    value={value}
                />
            </form>
            {children}
        </Frame>
    );
}

function stopPropagation(event: KeyboardEvent | MouseEvent) {
    event.stopPropagation();
}
