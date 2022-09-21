import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { type ComponentType } from 'react';
import { Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { CloseButton, EditorBlock } from '#components';
import { useFunction } from '#lib';

import styles from './PlaceholderElement.module.scss';

export interface Props extends RenderElementProps {
    // Core
    icon: ComponentType<{ className?: string }>;
    title: ReactNode;
    description: ReactNode;
    // Variations
    dropzone?: boolean;
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
    dropzone = false,
    selected,
    // Callbacks
    onClick,
}: Props) {
    const editor = useSlateStatic();
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
                        [styles.dropzone]: dropzone,
                        [styles.selected]: isSelected,
                    })}
                    onClick={onClick}
                >
                    <CloseButton
                        className={styles.CloseButton}
                        onClick={handleRemove}
                        title="Delete this block"
                    />
                    <Icon className={styles.Icon} />
                    <h2 className={styles.Title}>{title}</h2>
                    <p className={styles.Description}>{description}</p>
                </div>
            )}
            rounded
            selected={selected}
            void
        />
    );
}
