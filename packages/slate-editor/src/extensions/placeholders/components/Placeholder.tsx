import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';
import { PlaceholderAttachment } from '#icons';

import styles from './Placeholder.module.scss';

export function Placeholder({ element, attributes, children }: RenderElementProps) {
    return (
        <EditorBlock
            {...attributes}
            border="dashed"
            className={styles.EditorBlock}
            element={element}
            renderAboveFrame={children}
            renderReadOnlyFrame={() => (
                <div className={styles.Frame}>
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
