import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { type ComponentType, forwardRef, type ReactElement, type ReactNode } from 'react';

import { type Props as BaseProps, Frame } from './Frame';
import styles from './Placeholder.module.scss';

type ContentRenderProps = {
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
            progress,
            selected = false,
            // Callbacks
            ...props
        },
        forwardedRef,
    ) => {
        const isLoading = typeof progress === 'number' || progress === true;
        const progressNumber = typeof progress === 'number' ? progress : undefined;

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

        return (
            <Frame
                {...props}
                className={classNames(className, styles.Placeholder)}
                ref={forwardedRef}
                dragOver={dragOver}
                progress={progress}
                selected={selected}
            >
                <Icon className={styles.Icon} />
                <h2 className={styles.Title}>{renderContent(title, selected)}</h2>
                <p className={styles.Description}>{renderContent(description, selected)}</p>
            </Frame>
        );
    },
);

Placeholder.displayName = 'Placeholder';
