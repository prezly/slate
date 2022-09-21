import type { ReactNode } from 'react';
import React, { type ComponentType } from 'react';
import { Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { CloseButton, EditorBlock } from '#components';
import { useFunction } from '#lib';

import styles from './PlaceholderElement.module.scss';

interface Props extends RenderElementProps {
    icon: ComponentType<{ className?: string }>;
    title: ReactNode;
    description: ReactNode;
    onClick?: () => void;
}

export function PlaceholderElement({
    // Slate Props
    attributes,
    children,
    element,
    // Custom
    icon: Icon,
    title,
    description,
    onClick,
}: Props) {
    const editor = useSlateStatic();
    const handleRemove = useFunction(() => {
        Transforms.removeNodes(editor, { at: [], match: (node) => node === element });
    });

    return (
        <EditorBlock
            {...attributes}
            border="dashed"
            className={styles.EditorBlock}
            element={element}
            renderAboveFrame={children}
            renderReadOnlyFrame={() => (
                <div className={styles.Frame} onClick={onClick}>
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
            void
        />
    );
}
