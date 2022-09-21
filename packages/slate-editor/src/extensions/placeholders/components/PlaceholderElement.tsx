import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { type ComponentType, type ReactElement, type ReactNode, useState } from 'react';
import { Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { CloseButton, EditorBlock } from '#components';
import { useFunction } from '#lib';

import styles from './PlaceholderElement.module.scss';

type ContentRenderFn = (props: { isDragOver: boolean; isSelected: boolean }) => ReactElement | null;

export interface Props extends RenderElementProps {
    // Core
    icon: ComponentType<{ className?: string }>;
    title: ReactNode | ContentRenderFn;
    description: ReactNode | ContentRenderFn;
    // Variations
    dragOver?: boolean;
    dropZone?: boolean;
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

    return (
        <EditorBlock
            {...attributes}
            element={element}
            renderAboveFrame={children}
            renderReadOnlyFrame={({ isSelected }) => (
                <div
                    className={classNames(styles.Frame, {
                        [styles.dragOver]: actualDragOver,
                        [styles.selected]: isSelected,
                    })}
                    onClick={onClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <CloseButton
                        className={classNames(styles.CloseButton, {
                            [styles.hidden]: actualDragOver,
                        })}
                        onClick={handleRemove}
                        title="Delete this block"
                    />
                    <Icon className={styles.Icon} />
                    <h2 className={styles.Title}>
                        {render(title, { isSelected, isDragOver: actualDragOver })}
                    </h2>
                    <p className={styles.Description}>
                        {render(description, { isSelected, isDragOver: actualDragOver })}
                    </p>
                </div>
            )}
            rounded
            selected={selected}
            void
        />
    );
}

function render<P>(content: ReactNode | FunctionComponent<P>, props: P): ReactElement | null {
    if (typeof content === 'function') {
        return content(props);
    }
    return <>{content}</>;
}
