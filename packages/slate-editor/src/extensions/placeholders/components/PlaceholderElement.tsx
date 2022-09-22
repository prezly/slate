import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { type ComponentType, type ReactElement, type ReactNode, useState } from 'react';
import { Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { CloseButton, EditorBlock } from '#components';
import { useFunction } from '#lib';

import styles from './PlaceholderElement.module.scss';

type ContentRenderProps = {
    isDragOver: boolean;
    isLoading: boolean;
    isSelected: boolean;
    progress: number;
};
type ContentRenderFn = (props: ContentRenderProps) => ReactElement | null;

export interface Props extends RenderElementProps {
    // Core
    icon: ComponentType<{ className?: string }>;
    title: ReactNode | ContentRenderFn;
    description: ReactNode | ContentRenderFn;
    // Variations
    dragOver?: boolean;
    dropZone?: boolean;
    progress?: boolean | number;
    selected?: boolean;
    // Callbacks
    onClick?: () => void;
}

export function PlaceholderElement({
    // Slate Props
    attributes,
    children,
    element,
    // Core
    icon: Icon,
    title,
    description,
    // Variations
    dragOver: externalDragOver,
    dropZone = false,
    progress,
    selected,
    // Callbacks
    onClick,
}: Props) {
    const editor = useSlateStatic();

    const [dragOver, setDragOver] = useState(false);
    const actualDragOver = dropZone ? externalDragOver ?? dragOver : false;

    const handleDragOver = useFunction(() => setDragOver(true));
    const handleDragLeave = useFunction(() => setDragOver(false));
    const handleRemove = useFunction(() => {
        Transforms.removeNodes(editor, { at: [], match: (node) => node === element });
    });

    const isLoading = typeof progress === 'number' || progress === true;
    const progressNumber = typeof progress === 'number' ? progress : undefined;
    const progressPercentage = progressNumber !== undefined ? `${progress}%` : undefined;

    function renderContent(
        content: ReactNode | FunctionComponent<ContentRenderProps>,
        isSelected: boolean,
    ): ReactElement | null {
        if (typeof content === 'function') {
            return content({
                isDragOver: actualDragOver,
                isLoading,
                isSelected,
                progress: progressNumber ?? 0,
            });
        }
        return <>{content}</>;
    }

    return (
        <EditorBlock
            {...attributes}
            element={element}
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) => (
                <div
                    className={classNames(styles.Frame, {
                        [styles.dragOver]: actualDragOver,
                        [styles.knownProgress]: typeof progress === 'number',
                        [styles.unknownProgress]: progress === true,
                        [styles.selected]: isSelected,
                    })}
                    onClick={onClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <div className={styles.Progress} style={{ width: progressPercentage }} />
                    <CloseButton
                        className={classNames(styles.CloseButton, {
                            [styles.hidden]: actualDragOver,
                        })}
                        onClick={handleRemove}
                        title="Delete this block"
                    />
                    <Icon className={styles.Icon} />
                    <h2 className={styles.Title}>{renderContent(title, isSelected)}</h2>
                    <p className={styles.Description}>{renderContent(description, isSelected)}</p>
                </div>
            )}
            rounded
            selected={selected}
            void
        />
    );
}
