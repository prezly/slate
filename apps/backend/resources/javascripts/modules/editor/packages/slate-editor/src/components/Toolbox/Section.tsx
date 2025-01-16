import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

import { Caption } from './Caption';
import styles from './Toolbox.module.scss';

interface Props {
    children?: ReactNode;
    caption?: string;
    noPadding?: boolean;
    paddingBottom?: '3';
}

export function Section({ caption, children, noPadding, paddingBottom }: Props) {
    return (
        <div
            className={classNames(styles.section, {
                [styles['section--no-padding']]: noPadding,
            })}
        >
            {caption && (
                <div
                    className={classNames(styles['section-header-wrapper'], {
                        [styles['section-header-wrapper--padding-bottom-3']]: paddingBottom === '3',
                    })}
                >
                    <Caption>{caption}</Caption>
                </div>
            )}

            {children}
        </div>
    );
}
