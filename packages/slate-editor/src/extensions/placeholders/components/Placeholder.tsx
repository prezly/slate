import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import styles from './Placeholder.module.scss';

export function Placeholder({ element, attributes, children }: RenderElementProps) {
    return (
        <EditorBlock
            {...attributes}
            element={element}
            renderAboveFrame={children}
            renderReadOnlyFrame={() => (
                <div className={styles.Frame}>Drag or click to upload an attachment</div>
            )}
            rounded
            void
        />
    );
}
