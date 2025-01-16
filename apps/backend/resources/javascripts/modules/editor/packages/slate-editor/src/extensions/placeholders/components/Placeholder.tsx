import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { type ComponentType, forwardRef, type ReactNode } from 'react';

import { type Props as BaseProps, Frame } from './Frame';
import styles from './Placeholder.module.scss';

export type ContentRenderProps = {
    isDragOver: boolean;
    isLoading: boolean;
    isSelected: boolean;
    progress: number | undefined;
};

export interface Props extends Omit<BaseProps, 'title'> {
    // Core
    icon: ComponentType<{ className?: string }>;
    title: ReactNode | FunctionComponent<ContentRenderProps>;
    description: ReactNode | FunctionComponent<ContentRenderProps>;
}

export const Placeholder = forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
            // Core
            icon: Icon,
            title,
            description,
            // Variations
            dragOver,
            dropZone,
            progress,
            selected = false,
            // Callbacks
            ...attributes
        },
        forwardedRef,
    ) => {
        const isLoading = typeof progress === 'number' || progress === true;
        const progressNumber = typeof progress === 'number' ? progress : undefined;

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

        return (
            <Frame
                {...attributes}
                className={classNames(className, styles.Placeholder, {
                    [styles.dragOver]: dragOver,
                })}
                ref={forwardedRef}
                dragOver={dragOver}
                dropZone={dropZone}
                progress={progress}
                selected={selected}
            >
                <Icon className={styles.Icon} />
                <div className={styles.Text}>
                    <h2 className={styles.Title}>{renderContent(title, selected)}</h2>
                    <p className={styles.Description}>{renderContent(description, selected)}</p>
                </div>
            </Frame>
        );
    },
);

Placeholder.displayName = 'Placeholder';
