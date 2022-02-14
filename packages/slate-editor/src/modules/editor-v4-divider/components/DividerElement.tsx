import type { DividerNode } from '@prezly/slate-types';
import type { PropsWithChildren } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import styles from './DividerElement.module.scss';

interface Props extends RenderElementProps {
    element: DividerNode;
}

export function DividerElement({ attributes, children, element }: PropsWithChildren<Props>) {
    return (
        <EditorBlock
            element={element}
            extendedHitArea
            slateInternalsChildren={children}
            {...attributes}
        >
            <hr className={styles.divider} />
        </EditorBlock>
    );
}
