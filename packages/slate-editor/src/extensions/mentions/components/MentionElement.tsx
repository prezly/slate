import { type RenderElementProps } from '@udecode/plate';
import { useSelected } from '@udecode/plate/react';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import type { MentionElementType } from '../types';

import styles from './MentionElement.module.scss';

interface Props extends RenderElementProps {
    element: MentionElementType;
}

export const MentionElement: FunctionComponent<Props> = ({ attributes, children }) => {
    const selected = useSelected();

    return (
        <span
            {...attributes}
            className={classNames(styles.MentionElement, {
                [styles.selected]: selected,
            })}
            contentEditable={false}
        >
            {children}
        </span>
    );
};
