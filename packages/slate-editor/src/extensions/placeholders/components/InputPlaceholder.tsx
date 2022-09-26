import classNames from 'classnames';
import type { FunctionComponent, ReactNode, ReactElement, FormEvent } from 'react';
import React, { useRef, useState } from 'react';

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
    initialValue?: string;
    placeholder?: string;
    onSubmit?: (value: string) => void;
}

export function InputPlaceholder({
    className,
    action,
    title,
    description,
    dragOver,
    format = 'card-lg',
    progress,
    selected = false,
    // Input properties
    disabled = false,
    initialValue = '',
    placeholder,
    onSubmit,
    ...props
}: Props) {
    const isLoading = typeof progress === 'number' || progress === true;
    const progressNumber = typeof progress === 'number' ? progress : undefined;
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

    return (
        <Frame
            {...props}
            className={classNames(className, styles.InputPlaceholder)}
            dragOver={dragOver}
            format={format}
            progress={progress}
            selected={selected}
        >
            <div className={styles.Title}>{renderContent(title, selected)}</div>
            <div className={styles.Description}>{renderContent(description, selected)}</div>
            <form onSubmit={handleSubmit}>
                <Input
                    button={{ text: action, type: 'submit' }}
                    className={styles.Input}
                    disabled={disabled}
                    icon="link"
                    onChange={setValue}
                    placeholder={placeholder}
                    ref={input}
                    required
                    type="url"
                    value={value}
                />
            </form>
        </Frame>
    );
}
