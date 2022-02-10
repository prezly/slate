import classNames from 'classnames';
import React from 'react';

import { Caption } from './Caption';
import styles from './Toolbox.module.scss';

interface SectionProps {
    caption?: string;
    noPadding?: boolean;
}

export function Section(props: React.PropsWithChildren<SectionProps>) {
    return (
        <div
            className={classNames(styles.__section, {
                [styles['__section--no-padding']]: props.noPadding,
            })}
        >
            {props.caption && (
                <div className={styles['__section-header-wrapper']}>
                    <Caption>{props.caption}</Caption>
                </div>
            )}

            {props.children}
        </div>
    );
}
