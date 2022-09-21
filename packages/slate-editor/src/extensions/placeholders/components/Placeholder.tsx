import React from 'react';
import { Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { CloseButton, EditorBlock } from '#components';
import { PlaceholderAttachment } from '#icons';
import { useFunction } from '#lib';

import styles from './Placeholder.module.scss';

export function Placeholder({ element, attributes, children }: RenderElementProps) {
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
                <div className={styles.Frame}>
                    <CloseButton
                        className={styles.CloseButton}
                        onClick={handleRemove}
                        title="Delete this block"
                    />
                    <PlaceholderAttachment className={styles.Icon} />
                    <h2 className={styles.Title}>Drag or click to upload an attachment</h2>
                    <p className={styles.Description}>
                        Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB
                    </p>
                </div>
            )}
            rounded
            void
        />
    );
}
