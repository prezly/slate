import classNames from 'classnames';
import type {
    FunctionComponent,
    KeyboardEvent,
    MouseEvent,
    ReactNode,
    ReactElement,
    FormEvent,
} from 'react';
import React, { useCallback, useRef, useState } from 'react';

import { Input } from '#components';

import { type Props as BaseProps, Frame } from './Frame';
import styles from './InputPlaceholder.module.scss';
import type { ContentRenderProps } from './Placeholder';

export interface Props extends Omit<BaseProps, 'title' | 'onSubmit'> {
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
    onSubmit?: (value: string) => void;
}

export function InputPlaceholder({
    className,
    action,
    title,
    description,
    dragOver,
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

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (input.current?.validity.valid) {
            onSubmit?.(value);
        }
    }

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
            <form onSubmit={handleSubmit}>
                <Input
                    autoFocus={autoFocus}
                    button={{ text: action, type: 'submit' }}
                    className={styles.Input}
                    disabled={disabled}
                    icon="link"
                    onChange={setValue}
                    pattern={pattern}
                    placeholder={placeholder}
                    ref={input}
                    required
                    type={type}
                    value={value}
                />
            </form>
        </Frame>
    );
}

function stopPropagation(event: KeyboardEvent | MouseEvent) {
    event.stopPropagation();
}
