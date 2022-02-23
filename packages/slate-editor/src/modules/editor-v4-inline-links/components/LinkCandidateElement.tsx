import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { LinkCandidateNode } from '../types';

import styles from './LinkCandidateElement.module.scss';

interface Props extends RenderElementProps {
    element: LinkCandidateNode;
}

export const LinkCandidateElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
}) => (
    <span
        {...attributes}
        className={styles.linkCandidate}
        data-slate-type={element.type}
        id={element.id}
    >
        {children}
    </span>
);
