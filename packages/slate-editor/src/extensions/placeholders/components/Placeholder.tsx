import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React, { type ComponentType, forwardRef, type ReactElement, type ReactNode } from 'react';

import { CloseButton } from '#components';

import styles from './Placeholder.module.scss';

type ContentRenderProps = {
    isDragOver: boolean;
    isLoading: boolean;
    isSelected: boolean;
    progress: number;
};
type ContentRenderFn = (props: ContentRenderProps) => ReactElement | null;

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    // Core
    icon: ComponentType<{ className?: string }>;
    title: ReactNode | ContentRenderFn;
    description: ReactNode | ContentRenderFn;
    // Variations
    dragOver?: boolean;
    progress?: boolean | number;
    selected?: boolean;
    // Callbacks
    onClick?: () => void;
    onDragOver?: () => void;
    onDragLeave?: () => void;
    onRemove?: () => void;
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
            progress,
            selected = false,
            // Callbacks
            onRemove,
            ...props
        },
        forwardedRef,
    ) => {
        const isLoading = typeof progress === 'number' || progress === true;
        const progressNumber = typeof progress === 'number' ? progress : undefined;
        const progressPercentage = progressNumber !== undefined ? `${progress}%` : undefined;

        function renderContent(
            content: ReactNode | FunctionComponent<ContentRenderProps>,
            isSelected: boolean,
        ): ReactElement | null {
            if (typeof content === 'function') {
                return content({
                    isDragOver: Boolean(dragOver),
                    isLoading,
                    isSelected,
                    progress: progressNumber ?? 0,
                });
            }
            return <>{content}</>;
        }

        return (
            <div
                {...props}
                ref={forwardedRef}
                className={classNames(className, styles.Placeholder, {
                    [styles.dragOver]: dragOver,
                    [styles.knownProgress]: typeof progress === 'number',
                    [styles.unknownProgress]: progress === true,
                    [styles.selected]: selected,
                })}
            >
                <div className={styles.Progress} style={{ width: progressPercentage }} />
                <CloseButton
                    className={classNames(styles.CloseButton, {
                        [styles.hidden]: dragOver,
                    })}
                    onClick={onRemove}
                    title="Delete this block"
                />
                <Icon className={styles.Icon} />
                <h2 className={styles.Title}>{renderContent(title, selected)}</h2>
                <p className={styles.Description}>{renderContent(description, selected)}</p>
            </div>
        );
    },
);

Placeholder.displayName = 'Placeholder';
